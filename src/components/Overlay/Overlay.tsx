import { useTransition, animated, config } from 'react-spring'
import { css } from '@emotion/react'
import { cssVar } from '../../contexts/ThemeProvider'

interface Props {
  visible?: boolean
}

/**
 * Overlay is a component that is used to display a semi-transparent layer over the entire page.
 * It is used to display a modal or a dialog.
 *
 * Transition takes 150ms to complete.
 */
export function Overlay({ visible }: Props) {
  const transitions = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, pointerEvents: 'none' },
    reverse: visible,
    delay: 150,
  })

  return transitions((styles, item) =>
    item ? (
      <animated.div style={styles} css={overlayStyle}></animated.div>
    ) : null
  )
}
const overlayStyle = css`
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${cssVar('overlay')};
  z-index: 10;
`
