import { IMyIconSelectProps } from './types';
import { use_icon } from './utils';

export default function MyIcon(props: IMyIconSelectProps) {
    const { render_Icon } = use_icon(props)
    return render_Icon(props.value)
}



