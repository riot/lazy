const globals = { riot: 'riot', '@riotjs/util/dom': 'riotUtil' }

export default {
  input: 'index.next.js',
  external: ['riot', '@riotjs/util/dom'],
  output: [
    {
      name: 'lazy',
      file: 'index.cjs',
      format: 'umd',
      globals,
    },
    {
      name: 'lazy',
      file: 'index.js',
      format: 'esm',
      globals,
    },
  ],
}
