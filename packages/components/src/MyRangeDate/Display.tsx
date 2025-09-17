import { format_range_props, IMyRangePickerProps } from './utils';


export const DisplayFC = (_props: IMyRangePickerProps) => {
  const props = format_range_props(_props)

  const { linker, } = props
  const disPlay_value = props.display_value as string[]



  return disPlay_value.join(linker)
}