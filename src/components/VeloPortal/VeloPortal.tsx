import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children?: React.ReactNode
}

function isSSR() {
  return typeof window === 'undefined' || typeof document === 'undefined'
}
export function VeloPortal({ children }: Props) {
  const el = useMemo(() => (isSSR() ? null : document.createElement('div')), [])
  useEffect(() => {
    if (!el) return
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [el])

  if (!el) return null
  return createPortal(children, el)
}
