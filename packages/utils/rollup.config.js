import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import path from 'path'
import { defineConfig } from 'rollup';
export default defineConfig(
  {
    input: ["src/index.ts"],

    plugins: [

      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        emitDeclarationOnly: true,
      }),
      babel({
        presets: ['@babel/preset-react'],
        babelHelpers: 'runtime',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
        plugins: [
          '@babel/plugin-transform-runtime',

        ],
      })
    ],
    output: {
      dir: path.join(__dirname, 'dist'),
      format: 'esm',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime'
          ]
        })
      ]
    },
    external: ['dayjs']
    // external: Object.keys({ ...require('./package.json').peerDependencies }) // 增加了这一行。

  }
)





