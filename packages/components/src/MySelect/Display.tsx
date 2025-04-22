import React from 'react';
import { IMySelectProps } from './types';
import { check_multiple, use_options } from 'src/utils';

export function DisplayFC(props: IMySelectProps) {



  const { loading, data, display_node } = use_options(props)



  return display_node;
}
