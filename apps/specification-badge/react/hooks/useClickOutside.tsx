import { useEffect, useRef } from 'react'

export function useClickOutside<T extends HTMLElement>(
  clickOutsideCB: () => void,
) {
  const reference = useRef<T>(null)

  useEffect(() => {
    window.document.addEventListener('click', (event) => {
      const { target } = event
      const { current } = reference

      if (!target || !current) return

      if (!current.contains(target as Node)) {
        clickOutsideCB()
      }
    })
  }, [clickOutsideCB])

  return { reference }
}
