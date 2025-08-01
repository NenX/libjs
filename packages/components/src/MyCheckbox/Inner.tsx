import { cloneDeep, ICommonOption, isNil, numberLikeCompare } from '@noah-libjs/utils';
import { default as classNames, default as classnames } from 'classnames';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { Checkbox_L } from 'src/LazyAntd';
import { TCommonComponent } from '../util-types';
import { getMarshal, parse_MC_value, use_options } from 'src/utils';
import MyCheckbox_DisplayFC from './Display';
import { components } from './components';
import styles from './index.module.less';
import { ICheckboxWithInputOption, IMyCheckboxProps } from './types';
const MyCheckbox: TCommonComponent<IMyCheckboxProps, string | number | ICommonOption[]> = (props) => {
  const { type = 'single', value, onChange, disabled = false, onBlur, inputWidth = 50, vertical = false, style = {} } = props;

  const marshal = getMarshal(props)
  const { options, loading, data: __data, setData } = use_options(props)

  const longOptions = options.length > 2
  const forcusInfo = useRef<{ index?: number, type?: 'child' | 'parent' }>({})
  // mchcEnv.logger.log('MyCheckbox', { MyCheckboxProps, options, __data })
  useEffect(() => {
    // const _value = parseValue(value, marshal, type)
    // setData(_value);
    // if (isNil(value)) {
    //   setData([]);
    // } else {
    //   const d = marshal ? safe_json_parse(value, []) : (type === 'single' ? [{ value }] : (value?.split?.(',')?.filter?.(_ => !isNil(_))?.map?.(value => ({ value })) ?? []))
    //   setData(Array.isArray(d) ? d : []);
    // }
  }, [value]);
  function safe_onChange(changedValue: ICommonOption[]) {
    // if (!changedValue.length) {
    //   return onChange?.(undefined)
    // }
    // const v = marshal ? (Number(marshal) == 2 ? changedValue : JSON.stringify(changedValue,)) : (type === 'single' ? (changedValue[0]?.value ?? null) : changedValue.map(_ => _.value).join(','))
    const v = parse_MC_value(props, changedValue)
    onChange?.(v)
  }


  const handleBoxGroupChange = (checkedValues: any[] = []) => {
    const hasExclusiveItem = checkedValues
      .filter(v => {
        return !isChecked(v)
      })
      .find(v => {
        const option = options.find(o => o.value === v)
        return option?.exclusive
      })
    const values = !isNil(hasExclusiveItem) ? [hasExclusiveItem] : checkedValues.filter(v => !options.find(_ => _.value === v)?.exclusive)
    const changedData: ICommonOption[] = values
      .filter(v => type === 'multiple' ? true : !isChecked(v))
      .map(v => {
        const option = options.find(o => o.value === v)
        const old = __data.find(d => d.value === v)
        return { value: option?.value, label: option?.label, text: old?.text ?? undefined }
      })

    setData(changedData)
    safe_onChange(changedData);
  };

  const handleInputChange = (option: ICheckboxWithInputOption) => (inputValue: any) => {
    const tempData = cloneDeep(__data) || [];
    const target = tempData.find(d => d.value === option.value)
    if (!target) return



    target.text = inputValue


    // setData(tempData);
    safe_onChange(tempData);
  };



  const renderInput = (option: ICheckboxWithInputOption) => {
    const {
      inputType,
    } = option;
    const targetData = __data.find(d => d.value === option.value)
    if (!targetData || !inputType) return null
    let C = components?.[inputType as keyof typeof components]
    const inputValue = targetData.text;

    const props: any = option.props ?? {}
    let style: CSSProperties = props.style ?? {}
    if (['MyInput', 'Input', 'input', 'MA', 'MyAutoComplete'].includes(inputType)) {
      style = { width: inputWidth * (longOptions ? 1 : 1.5), ...style }
    }
    if (['Select', 'MS', 'MySelect'].includes(inputType)) {
      style = { minWidth: inputWidth * (longOptions ? 1 : 1.5), ...style }
    }
    return C ? <C
      size="small"
      disabled={disabled}
      marshal={marshal}
      inputWidth={inputWidth}
      // onBlur={onBlur}
      className={classnames({
        // 'global-issue-input': option.warning,
      })}
      style={style}
      {...props}

      onChange={handleInputChange(option)}
      value={inputValue}

    /> : null

  };
  function isChecked(value: any) {
    // return __data.some(d => d.value === value)
    return __data.some(d => numberLikeCompare(d.value, value))

  }
  if (options.length === 0) return null
  return (
    <Checkbox_L.Group className={classNames([styles['wrapper'], vertical ? styles['block-box'] : styles['flex-box']])} disabled={disabled} value={__data.map(_ => _.value)} onChange={handleBoxGroupChange}
      style={{
        ...style,
        // width: '100%',
        flexWrap: 'wrap',
      }}>
      {options.map((option, index) => {
        const { prefix, sufix, suffix, parentheses } = option
        const _parentheses = parentheses ?? (['MC', 'MArr'].includes(option.inputType!) && !!option?.props?.options)
        const _suffix = sufix ?? suffix
        const checked = isChecked(option.value)
        const node = checked ? renderInput(option) : null

        const surround_node = <>
          {_parentheses && checked ? <span style={{ margin: "0 2px", }}>(</span> : null}
          {prefix && checked ? <span style={{ margin: "0 2px", whiteSpace: 'nowrap', }}>{prefix}</span> : null}
          {node ? <span
            onFocus={(e) => {
              forcusInfo.current = { index, type: 'child' }
            }}
            onBlur={(e) => {
              forcusInfo.current = { index: undefined, type: undefined }
              onBlur?.(e)
            }}

            style={{
              // margin: "0 2px",
            }}>{node}</span> : null}
          {_suffix && checked ? <span style={{ margin: "0 2px", }}>{_suffix}</span> : null}
          {_parentheses && checked ? <span style={{ margin: "0 2px", whiteSpace: 'nowrap', }}>)</span> : null}
        </>
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: 2 }} className={(option.warning && checked) ? styles['warning'] : undefined}>
            <span
              onFocus={(e) => {

                setTimeout(() => {
                  forcusInfo.current = { index, type: 'parent' }
                }, 10);
              }}
              onBlur={(e) => {

                setTimeout(() => {
                  if (forcusInfo.current.index === index && forcusInfo.current.type === 'child')
                    return
                  forcusInfo.current = { index: undefined, type: undefined }
                  onBlur?.(e)
                }, 10);
              }}
            >
              <Checkbox_L value={option.value} >
                {option.label}
              </Checkbox_L>
            </span>
            {
              surround_node
            }

          </div>
        );


      })}
    </Checkbox_L.Group>

  );
};
MyCheckbox.DisplayFC = MyCheckbox_DisplayFC
export default MyCheckbox