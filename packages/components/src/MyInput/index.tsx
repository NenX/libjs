import { Input, InputRef } from "antd";
import React, { forwardRef, useEffect, useState } from "react";
import { MyInputNumber } from "../MyInputNumber";
import { TCommonComponent } from "../util-types";
import { form_item_read, get_status_cls, getInputStyle } from "../utils";
import { IMyInputProps } from "./types";
export * from "./types";
const MyInput: TCommonComponent<IMyInputProps, string> = forwardRef<
  InputRef,
  IMyInputProps
>((props, myRef) => {
  const {
    width,
    style = {},
    placeholder,
    name,
    warning,
    form,
    value,
    onChange,
    type,
    ...others
  } = props;

  const [is_r, n] = form_item_read(props, value)
  if (is_r)
    return n
  if (type === "number") return <MyInputNumber {...(props as any)} />;
  const [_value, set_value] = useState(value);

  useEffect(() => {
    set_value(value);
  }, [value]);
  const _style = getInputStyle(props);

  return (
    <Input
      ref={myRef}
      value={_value}
      title={value}
      onChange={(e) => {
        const v = e.target.value;
        set_value(v);
        onChange?.(v);
      }}
      classNames={{
        input: get_status_cls(props.status),
      }}
      style={_style}
      {...others}
      placeholder={placeholder ?? "请输入"}
    />
  );
});

MyInput.DisplayFC = (props) => {
  return props.value;
};

export { MyInput };
