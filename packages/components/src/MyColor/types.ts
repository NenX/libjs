import { ColorPickerProps } from "src/LazyAntd";

export type IMyColorProps = Omit<ColorPickerProps, 'value' | 'onChange'>
    & { value?: string | null, onChange?(v: string | null): void }