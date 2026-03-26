import { forwardRef, useCallback, useEffect, useRef } from 'react'

/**
 * Scroll-triggered fade/slide-in. Respects prefers-reduced-motion.
 * Does not wrap or alter the site header / hamburger.
 */
export const Reveal = forwardRef(function Reveal(
  { as: Comp = 'div', className = '', stagger, children, ...rest },
  forwardedRef,
) {
  const innerRef = useRef(null)

  const setRef = useCallback(
    (node) => {
      innerRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef],
  )

  useEffect(() => {
    const el = innerRef.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('reveal-visible')
      return undefined
    }

    let done = false
    let io = null
    const show = () => {
      if (done) return
      done = true
      el.classList.add('reveal-visible')
      io?.disconnect()
    }

    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show()
            break
          }
        }
      },
      {
        root: null,
        // Positive bottom margin: trigger a bit before the block enters view; avoids stuck opacity:0 in strict iframes / IO quirks.
        rootMargin: '0px 0px 12% 0px',
        threshold: 0,
      },
    )
    io.observe(el)

    // After layout: if the block already overlaps the viewport, show without waiting on IO alone.
    const t0 = window.setTimeout(() => {
      if (done) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (r.bottom > 0 && r.top < vh) show()
    }, 0)

    // Last resort: never leave main content permanently invisible if IO never fired (preview embeds, etc.).
    const t1 = window.setTimeout(() => {
      if (!done) show()
    }, 2500)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      io.disconnect()
    }
  }, [])

  const staggerClass =
    stagger === 'hero'
      ? 'reveal--hero'
      : stagger === 'cards'
        ? 'reveal--cards'
        : stagger === 'list'
          ? 'reveal--list'
          : stagger === 'workbook'
            ? 'reveal--workbook'
            : stagger === 'usageCards'
              ? 'reveal--usage-cards'
              : stagger === 'timeline'
                ? 'reveal--timeline'
                : ''

  const merged = `reveal ${staggerClass} ${className}`.trim()
  return (
    <Comp ref={setRef} className={merged || undefined} {...rest}>
      {children}
    </Comp>
  )
})
