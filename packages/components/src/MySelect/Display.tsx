import React from 'react';
import { IMySelectProps } from './types';
import { check_multiple, use_options } from './utils';

export function DisplayFC(props: IMySelectProps) {



  const { loading, data } = use_options(props)

  const is_multiple = check_multiple(props)

  // mchcLogger.log('MySelect', { data, options, props })

  const node = is_multiple ? data.map(_ => _.label).join(',') : data[0]?.label
  const devNode = node ?? ''
  return (
    <span title={devNode}>
      {
        loading ? '数据加载中...' : devNode
      }
    </span>
  );
}
