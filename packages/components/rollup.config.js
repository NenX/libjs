import image from '@rollup/plugin-image'
import jsx from 'acorn-jsx'
import cssUrl from 'postcss-url'
import postcss from 'rollup-plugin-postcss'
import { createSharedConfig } from '../../rollup.config'
import path from 'path'
export default (commandLineArgs) => {
    const config = createSharedConfig(commandLineArgs.watch)
    return [
        {
            ...config,
            acornInjectPlugins: [jsx()],
            plugins: [
                image({
                    //  dom: true
                }),
                postcss({
                    use: [['less', { javascriptEnabled: true }]],
                    // extract: true,
                    modules: true,
                    plugins: [
                        cssUrl({
                            url: 'inline',
                            // assetsPath: path.resolve(__dirname, './dist/imgxx'),
                            // useHash: true
                        }),
                    ],
                }),
                ...config.plugins,
            ],

            output: {
                ...config.output,
                format: 'esm',
                chunkFileNames: (ChunkInfo) => {
                    if (!ChunkInfo.facadeModuleId) return 'a_chunks/[name].js'
                    const id = ChunkInfo.facadeModuleId
                        .replace(/\..*$/, '')
                        .replace(/[\/ \\]/g, '/')
                        .split('/')
                        .slice(-2).join('.')
                    return `a_chunks/${id ? id : 'bad/[name]'}.js`
                },
            },

        }
    ]
}
