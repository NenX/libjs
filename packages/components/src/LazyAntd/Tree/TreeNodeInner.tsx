import Tree from 'antd/es/tree';

import React, { forwardRef } from 'react';

export default forwardRef(function LazyInner(props: any, ref) {
    return <Tree.TreeNode {...props} ref={ref} />
})