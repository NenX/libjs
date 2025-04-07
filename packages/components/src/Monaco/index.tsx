import { lazy } from 'react';
const MonacoInner = lazy(() => import('./Inner'))

type TMonaco = typeof MonacoInner & { config: (vs: string) => void }
const MyMonaco: TMonaco = Object.assign(
    MonacoInner,
    {
        config(vs: string) {
            // import('@monaco-editor/react/dist/index').then(mod => {
            //     mod.loader.config({ paths: { vs } });
            // })
        }
    }
)

export { MyMonaco }