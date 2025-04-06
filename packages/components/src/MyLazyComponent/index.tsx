import { Skeleton } from 'antd'
import React, { FC, Suspense, SuspenseProps } from 'react'
type TSize = 'tiny' | 'small' | 'middle' | 'large'
export const MyLazyComponent: FC<Partial<SuspenseProps> & { size?: TSize }> = function MyLazyComponent(props) {
    const { children, fallback, size = 'small' } = props
    const m: { [x in TSize]: number } = { tiny: 2, small: 4, middle: 8, large: 16 }
    const rows = m[size]
    return <Suspense fallback={
        fallback ??
        <div style={{ padding: 24 }}>
            <Skeleton paragraph={{ rows }} />
        </div>
    }>
        {children}
    </Suspense>
}