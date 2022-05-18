import { useTransition, animated, config } from 'react-spring'
import React from 'react'
import { css } from '@emotion/react'
import { Overlay, VeloPortal } from '..'
import { cssVar } from '../../contexts/ThemeProvider'

interface Props {
  /**
   * Whether the overlay is visible or not.
   */
  visible: boolean
  /**
   * Sets transitionType for modal appear & disappear.
   * Default is `pop`.
   */
  transitionType?: keyof typeof transitions
  /**
   * By default, modal width depends on children's width and has 1.5rem padding.
   * To customize, set `className` to this component.
   */
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const transitions = {
  fade: {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 250,
      friction: 18,
      clamp: true,
    },
  },
  pop: {
    from: { opacity: 0, transform: 'scale(0.9) translateY(100%)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0%)' },
    leave: {
      opacity: 0,
      transform: 'scale(0.9) translateY(100%)',
    },
    config: {
      tension: 200,
      friction: 20,
    },
  },
} as const

/**
 * Modal component interupts user's workflow and provides a way to interact with the user.
 */
export function Modal({
  visible,
  children,
  transitionType = 'pop',
  className,
}: Props) {
  const transition = useTransition(visible, {
    ...transitions[transitionType],
    reverse: visible,
  })

  return (
    <>
      <VeloPortal>
        <Overlay visible={visible} />
        {transition((animatedStyle, item) =>
          item ? (
            <div css={styles.positioner}>
              <animated.div
                style={animatedStyle}
                css={styles.modal}
                className={className}
              >
                {children}
              </animated.div>
            </div>
          ) : null
        )}
      </VeloPortal>
    </>
  )
}

const styles = {
  positioner: css`
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 20;
    transform: translate(-50%, -50%);
  `,
  modal: css`
    padding: 1.5rem;
    background: ${cssVar('background-modal')};
    display: flex;
    flex-direction: column;
    width: auto;
    border-radius: 0.25rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  `,
}
