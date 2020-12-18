const ENV = process.env.NODE_ENV
const prodOnly = () => (ENV === 'development' ? 'warn' : 'error')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-debugger': prodOnly(),
    'no-console': prodOnly(),
    'no-unused-vars': prodOnly(),
  },
}
