import { css } from '@emotion/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header } from './Header'
import { ReactComponent as Logo } from './logo.svg'
import { ReactComponent as DarkLogo } from './dark_logo.svg'
import { cssVar, useTheme } from '../..'
import { Button } from '..'
import { ToggleThemeButton } from '../ToggleThemeButton/ToggleThemeButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Basic = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  leftArea: 'Left',
  logo: 'Logo',
  rightArea: 'Right',
}

Basic.argTypes = {}

export const NamespacedComponent = Template.bind({})
NamespacedComponent.args = {
  children: [
    <Header.Logo>Logo</Header.Logo>,
    <Header.Left>LeftArea</Header.Left>,
    <Header.Right>RightArea</Header.Right>,
  ],
}

function VeloLogo() {
  const { isDarkTheme } = useTheme()
  return (
    <div css={styles.logoWrapper}>{isDarkTheme ? <DarkLogo /> : <Logo />}</div>
  )
}

function Left() {
  return (
    <nav css={[styles.hStack, styles.nav]}>
      <a className="active">Getting Started</a>
      <a>Docs</a>
      <a>GitHub</a>
    </nav>
  )
}

function Right() {
  return (
    <div css={styles.hStack}>
      <ToggleThemeButton />
      <Button variant="ghost">Sign in</Button>
      <Button>Sign up</Button>
    </div>
  )
}

const styles = {
  logoWrapper: css`
    display: flex;
    svg {
      height: 2rem;
      width: auto;
    }
  `,
  hStack: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  nav: css`
    gap: 1rem;
    a {
      cursor: pointer;
      color: ${cssVar('accent-7')};
      &:hover {
        color: ${cssVar('primary')};
      }
      text-decoration: none;

      &.active {
        color: ${cssVar('primary')};
        font-weight: bold;
      }
    }
  `,
}

export const Sample = Template.bind({})
Sample.args = {
  children: [
    <Header.Logo>
      <VeloLogo />
    </Header.Logo>,
    <Header.Left>
      <Left />
    </Header.Left>,
    <Header.Right>
      <Right />
    </Header.Right>,
  ],
}
