import React from 'react'
import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Button, VeloPortal } from '..'
import { Overlay } from './Overlay'
import { useEffect } from '@storybook/addons'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Overlay',
  component: Overlay,
} as ComponentMeta<typeof Overlay>

function Hide({ onClick }: { onClick(): void }) {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        display: flex;
        width: 100%;
        height: 100%;
        color: white;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `}
    >
      <Button onClick={onClick}>Hide</Button>
      <div
        css={css`
          margin-top: 0.5rem;
        `}
      >
        (This is not part of Overlay UI.)
      </div>
    </div>
  )
}

const Template: ComponentStory<typeof Overlay> = (args) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (args.visible === undefined) return
    setVisible(args.visible)
  }, [args.visible])
  return (
    <>
      <Button onClick={() => setVisible(true)}>Show Overlay</Button>
      <Overlay visible={visible} />
      {visible ? <Hide onClick={() => setVisible(false)} /> : null}
    </>
  )
}

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {}

Basic.argTypes = {}
