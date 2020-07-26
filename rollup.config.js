import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const globals = { 'riot': 'riot' }

export default {
  input: 'index.next.js',
  external: ['riot'],
  plugins: [
    babel({
      presets: ['@riotjs/babel-preset']
    })
  ],
  output: [
    {
      name: 'lazy',
      file: 'lazy.js',
      format: 'umd',
      globals
    },
    {
      name: 'rawth',
      file: 'lazy.min.js',
      format: 'umd',
      globals,
      plugins: [terser()]
    }
  ]
}