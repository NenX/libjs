import Tree from 'antd/es/tree';

import React, { forwardRef } from 'react';

export default forwardRef<any>(function LazyInner(props, ref) {
    return <Tree {...props} ref={ref} />
})