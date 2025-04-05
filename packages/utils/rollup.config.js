import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import path from 'path'
import { defineConfig } from 'rollup';
import { dts } from "rollup-plugin-dts";
import { readFileSync } from 'fs';


export default defineConfig(() => {
  const pkg = JSON.parse(readFileSync('./package.json'))

  const external = [
    'react', 'react-dom', 'antd', 'store', 'lodash', 'moment',
    /antd/, /lodash/, /axios/,
    ...Object.keys({ ...pkg.peerDependencies, })
  ]
  return [
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
        }),
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
      external,
      // external: Object.keys({ ...require('./package.json').peerDependencies }) // 增加了这一行。

    },
    {
      external,
      input: "dist/index.d.ts",
      output: [{ file: "dist/types.d.ts", format: "es" }],
      plugins: [dts({ respectExternal: true })],

    },
  ]
}
)





