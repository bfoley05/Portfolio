import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const resolveTargets = (target, scope) => {
  if (!target) return null
  if (typeof target === 'string') {
    const found = gsap.utils.toArray(target, scope)
    return found.length ? found : null
  }
  if (typeof target === 'object' && 'current' in target) return target.current
  return target
}

/**
 * pinAndTransform — pins a section in the viewport for a scroll distance
 * (default 100vh worth) and scrubs its layers through the pin, so the section
 * transforms into the next one instead of simply scrolling away.
 *
 * Each layer is `{ target, from, to, position }` where target may be a scoped
 * selector string, a ref, or an element (elements outside the pinned section
 * are allowed — that's how the incoming section is animated in).
 */
export const usePinAndTransform = (sectionRef, options = {}) => {
  const {
    layers = [],
    distance,
    start = 'top top',
    scrub = 0.8,
    pinSpacing = false,
    anticipatePin = 1,
    id,
    enabled = true
  } = options

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !enabled || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          id,
          trigger: section,
          start,
          end: () => {
            const length = typeof distance === 'function' ? distance() : distance
            return `+=${length ?? window.innerHeight}`
          },
          pin: section,
          pinSpacing,
          scrub,
          anticipatePin,
          invalidateOnRefresh: true
        }
      })

      layers.forEach(({ target, from = {}, to = {}, position = 0, duration = 1 }) => {
        const targets = resolveTargets(target, section)
        if (!targets) return
        timeline.fromTo(targets, from, { ...to, duration, ease: 'none' }, position)
      })
    }, sectionRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef, enabled])
}

/**
 * fadeUpOnScroll — the simple reveal for elements that don't need pinning.
 * Pass `childSelector` to stagger a container's children instead of the
 * element itself.
 */
export const useFadeUpOnScroll = (ref, options = {}) => {
  const {
    y = 40,
    duration = 0.9,
    ease = 'power2.out',
    start = 'top 85%',
    stagger = 0.08,
    childSelector,
    once = true,
    enabled = true
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    const targets = childSelector
      ? gsap.utils.toArray(childSelector, element)
      : element
    if (Array.isArray(targets) && !targets.length) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        ease,
        stagger: childSelector ? stagger : 0,
        scrollTrigger: {
          trigger: element,
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse'
        }
      })
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, enabled])
}
