import { defineConfig } from 'rolldown'

export default defineConfig({
    input: 'src/index.js',
    transform: { typescript: { declaration: { sourcemap: false } } },
    output: {
        dir: 'dist',
    },
})