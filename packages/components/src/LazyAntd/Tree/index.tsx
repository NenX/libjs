
import { TreeProps } from 'antd';
import { DirectoryTreeProps } from 'antd/lib/tree';
import RCTree, { TreeNode } from 'rc-tree';

import React, { FC, forwardRef } from 'react';
const Inner = React.lazy(() => import('./Inner'));
const DirectoryTreeInner = React.lazy(() => import('./DirectoryTreeInner'));
import { TreeNodeProps, DataNode } from 'rc-tree/es/interface'
const Tree_ = forwardRef<RCTree, TreeProps>(function Tree_(props, ref) {
    return <Inner {...props} ref={ref} />
})

function DirectoryTree(props: DirectoryTreeProps) {
    return <DirectoryTreeInner {...props} />
}

type TreeType = typeof Tree_ & { TreeNode: FC<TreeNodeProps<DataNode>>, DirectoryTree: typeof DirectoryTree, RCTree: RCTree };
//@ts-ignore
const Tree_L: TreeType = Object.assign(Tree_, { TreeNode: TreeNode, DirectoryTree, RCTree })

export { Tree_L, DirectoryTreeProps, TreeProps, TreeNodeProps, DataNode }

