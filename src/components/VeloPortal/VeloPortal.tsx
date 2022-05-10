import { useMemo } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children?: React.ReactNode
}

export function VeloPortal({ children }: Props) {
  const el = useMemo(() => {
    // block on SSR
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return null
    try {
      return document.getElementById('velo-portal')
    } catch (e) {
      return null
    }
  }, [])

  if (!el) return null
  return createPortal(children, el)
}
