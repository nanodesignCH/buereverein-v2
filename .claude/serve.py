"""Minimal static server for the /preview prototype gate.

The previews are plain HTML, but ES modules and self hosted fonts need a real
http origin, so file:// is not enough. Serves the project root so that
/preview and /public are both reachable.

Range requests are implemented on purpose: without them a browser reports the
hero video as not seekable and the scroll scrub silently does nothing. A real
Next.js server answers ranges, so this only closes a gap in the test server.
"""
import os
import re
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

RANGE_RE = re.compile(r"bytes=(\d*)-(\d*)")


class RangeHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def send_head(self):
        header = self.headers.get("Range")
        if not header:
            return super().send_head()

        match = RANGE_RE.fullmatch(header.strip())
        if not match:
            return super().send_head()

        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        try:
            handle = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None

        size = os.fstat(handle.fileno()).st_size
        first, last = match.group(1), match.group(2)
        if first:
            start = int(first)
            end = int(last) if last else size - 1
        else:
            # Suffix range: the last N bytes.
            start = max(0, size - int(last))
            end = size - 1
        end = min(end, size - 1)

        if start > end or start >= size:
            handle.close()
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.end_headers()
            return None

        handle.seek(start)
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        return _Slice(handle, end - start + 1)


class _Slice:
    """File-like wrapper so copyfile stops at the end of the requested range."""

    def __init__(self, handle, length):
        self._handle = handle
        self._left = length

    def read(self, amount=-1):
        if self._left <= 0:
            return b""
        if amount < 0 or amount > self._left:
            amount = self._left
        chunk = self._handle.read(amount)
        self._left -= len(chunk)
        return chunk

    def close(self):
        self._handle.close()


if __name__ == "__main__":
    handler = functools.partial(RangeHandler, directory=ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", 4321), handler)
    print(f"serving {ROOT} on http://127.0.0.1:4321", flush=True)
    server.serve_forever()
