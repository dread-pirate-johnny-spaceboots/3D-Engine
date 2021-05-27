import babel from 'rollup-plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    commonjs({
      include: "node_modules/**"
    }),
    babel({ 
        runtimeHelpers: true,
        exclude: 'node_modules/**'
     }),
  ],
}