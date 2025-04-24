import { CloseOutlined } from '@ant-design/icons';
import { AutoComplete, Button } from 'antd';
import React from 'react';
import { getInputStyle } from 'src/utils';
import { IMyAutoCompleteProps } from './types';
import { useConfig_MyAutoComplete } from './useConfig';
import { isInt } from '@noah-libjs/utils';


export default function MyAutoCompleteInner(props: IMyAutoCompleteProps) {

  const {
    popupMatchSelectWidth = 120,
    getPopupContainer = () => document.body,
    options: _options,
    style = {},
    defaultValue,
    value,
    placeholder,
    width,
    onChange,
    ...rest
  } = props;
  const _style = getInputStyle({ ...props })



  const { safeOnChange, onBlur, options, remove, init_value } = useConfig_MyAutoComplete(props)


  return (
    <AutoComplete
      // dropdownStyle={{ minWidth: 180 }}

      title={JSON.stringify(options)}
      popupMatchSelectWidth={popupMatchSelectWidth}
      style={_style}
      // bordered={false}
      allowClear
      {...rest}
      value={init_value ?? defaultValue}
      onBlur={onBlur}
      onChange={safeOnChange}
      // options={options}
      getPopupContainer={getPopupContainer}
      placeholder={placeholder ?? "请选择或输入"}

    >
      {options.map((item) => (
        <AutoComplete.Option key={item.value} value={item.value}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div title={item.label} style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: item.warning ? 'red' : '' }}>{item.label}</div>
            {
              item.id
                ? <Button
                  title="删除"
                  size='small'
                  type='dashed'
                  icon={<CloseOutlined />}
                  onClick={e => {
                    e.stopPropagation()
                    remove(item)
                  }}
                ></Button>
                : null
            }
          </div>
        </AutoComplete.Option>
      ))}
    </AutoComplete>

  );
}
