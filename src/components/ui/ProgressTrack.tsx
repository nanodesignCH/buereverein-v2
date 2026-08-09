/* Progress line along the bottom edge, one dot per entry, active dot as a ring.
   Rail and inactive dots are pewter, which per DESIGN.md 2 is exactly what
   pewter is for. The active dot is an ink ring, so the state is carried by
   shape and full contrast, never by a dimmed colour.
   The dots are real buttons, so the run is operable by keyboard even without
   the arrows. */

export function ProgressTrack({
  count,
  active,
  onJump,
  labelFor,
}: {
  count: number
  active: number
  onJump: (index: number) => void
  labelFor: (index: number) => string
}) {
  return (
    <div className="relative flex h-11 w-full items-center">
      <div aria-hidden="true" className="absolute inset-x-0 h-px bg-[var(--color-pewter)]" />
      <div className="relative flex w-full items-center justify-between">
        {Array.from({ length: count }, (_, i) => {
          const isActive = i === active
          return (
            <button
              key={i}
              type="button"
              aria-label={labelFor(i)}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onJump(i)}
              className="grid size-11 shrink-0 place-items-center bg-transparent p-0"
            >
              <span
                aria-hidden="true"
                className={`block size-2 rounded-full border transition-transform duration-150 ${
                  isActive
                    ? 'scale-[1.85] border-[var(--color-ink)] bg-transparent'
                    : 'border-[var(--color-pewter)] bg-[var(--color-pewter)]'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
