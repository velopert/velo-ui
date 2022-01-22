module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf)
    const babelRule = oneOfRule.oneOf.find((rule) =>
      rule.loader?.includes('babel-loader')
    )

    babelRule.options.presets.push('@emotion/babel-preset-css-prop')

    return config
  },
}
