/* Shared preview runtime.
   Mirrors what /src/lib/gsap.ts and SmoothScrollProvider will do later:
   plugins registered exactly once, every animation inside gsap.matchMedia(),
   one ScrollTrigger per section. */

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

export const DUR  = { fast: 0.6, base: 0.9, slow: 1.2 };
export const EASE = { out: 'power3.out', inOut: 'power2.inOut', scrub: 'none' };
export const STAG = { tight: 0.06, base: 0.08, loose: 0.1 };

export const REDUCED = '(prefers-reduced-motion: reduce)';
export const MOTION  = '(prefers-reduced-motion: no-preference)';

/* ScrollSmoother is created once, and never under reduced motion. The wrapper
   markup stays in the DOM either way so native scroll takes over. */
export function createSmoother() {
  const mm = gsap.matchMedia();
  mm.add(MOTION, () => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      smoothTouch: false,
      effects: false,
    });
    return () => smoother.kill();
  });
  return mm;
}

/* Line reveal for headlines that are authored as .mask-line wrappers in HTML.
   Authoring the lines by hand guarantees no line is ever cut mid word. */
export function revealLines(scope, selector, opts = {}) {
  const lines = gsap.utils.toArray(selector, scope).map((l) => l.firstElementChild);
  if (!lines.length) return null;
  return gsap.from(lines, {
    yPercent: 115,
    duration: opts.duration ?? DUR.base,
    stagger: opts.stagger ?? STAG.base,
    ease: EASE.out,
    delay: opts.delay ?? 0,
  });
}

export function showLines(scope, selector) {
  const lines = gsap.utils.toArray(selector, scope).map((l) => l.firstElementChild);
  gsap.set(lines, { yPercent: 0, clearProps: 'transform' });
}

/* Hero video scrub, per DESIGN.md.
   currentTime is driven through a proxy object that the scrub interpolates,
   never assigned raw inside onUpdate. Starts only once loadedmetadata has
   fired and duration is a finite number; until then the poster stands. */
export function heroVideoScrub(video, trigger, { end = '+=100%', pin = true } = {}) {
  const proxy = { time: 0 };
  let tween = null;

  /* The seek is applied from its own frame loop, not from the tween tick.
     A tick that lands before the file is seekable would otherwise be lost for
     good, because a finished scrub stops ticking and never retries. */
  let raf = 0;
  const sync = () => {
    raf = requestAnimationFrame(sync);
    if (video.readyState < 2 || video.seeking || !video.seekable.length) return;
    const target = Math.min(proxy.time, video.seekable.end(0));
    if (Math.abs(video.currentTime - target) > 1 / 48) video.currentTime = target;
  };
  raf = requestAnimationFrame(sync);

  const start = () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    tween = gsap.to(proxy, {
      time: video.duration - 0.05,
      ease: EASE.scrub,
      scrollTrigger: {
        trigger,
        start: 'top top',
        end,
        pin,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  };

  if (video.readyState >= 1) start();
  else video.addEventListener('loadedmetadata', start, { once: true });

  return () => {
    cancelAnimationFrame(raf);
    if (tween) { tween.scrollTrigger?.kill(); tween.kill(); }
  };
}

/* Word-wise masked reveal for the section headline that rides the hero to
   intro transition. scrub 1, stagger 0.1, words never split. */
export function revealWordsOnScrub(heading, triggerEl, { start, end }) {
  const split = SplitText.create(heading, { type: 'words', mask: 'words', wordsClass: 'w' });
  gsap.from(split.words, {
    yPercent: 110,
    ease: EASE.scrub,
    stagger: STAG.loose,
    scrollTrigger: { trigger: triggerEl, start, end, scrub: 1, invalidateOnRefresh: true },
  });
  return split;
}

/* Fonts and images change layout height, so pin distances are only correct
   after both have settled. */
export function refreshWhenReady() {
  const done = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(done);
  window.addEventListener('load', done, { once: true });
}
