
import { TreeProps } from 'antd';
import { DirectoryTreeProps } from 'antd/lib/tree';
import { TreeNode } from 'rc-tree';

import React, { FC } from 'react';
const Inner = React.lazy(() => import('./Inner'));
const DirectoryTreeInner = React.lazy(() => import('./DirectoryTreeInner'));
import { TreeNodeProps, DataNode } from 'rc-tree/es/interface'
function Tree_<T extends Object = any>(props: TreeProps<T>) {
    return <Inner {...props} />
}

function DirectoryTree(props: DirectoryTreeProps) {
    return <DirectoryTreeInner {...props} />
}

type TreeType = typeof Tree_ & { TreeNode: FC<TreeNodeProps<DataNode>>, DirectoryTree: typeof DirectoryTree };
const Tree_L: TreeType = Object.assign(Tree_, { TreeNode: TreeNode, DirectoryTree })

export { Tree_L, DirectoryTreeProps, TreeProps, TreeNodeProps, DataNode }

export function aa() {
    return <Tree_L />
}