import React, { Component, FC } from "react";
import { ContainerDimensionsProps } from 'react-container-dimensions';

export class ContainerDimensions extends Component<ContainerDimensionsProps, { Comp: FC<ContainerDimensionsProps> | null }> {
    // const[Comp, setComp] = useState<FC<ContainerDimensionsProps>>()
    constructor(props: any) {
        super(props)
        this.state = {
            Comp: null
        }
    }
    componentDidMount(): void {
        import('react-container-dimensions').then(res => {
            this.setState({ Comp: res.default as FC })
        })

    }


    render() {
        const Comp = this.state.Comp
        return Comp ? <Comp {...this.props} /> : <span>loading ContainerDimensions ...</span>
    }
}