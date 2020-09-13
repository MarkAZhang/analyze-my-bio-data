import { Component } from 'react'

type Props = {
  value: string,
  onChange: string => void,
  className: string,
}

type State = {
  value: string,
}

class Input extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { value } = props

    this.state = {
      value,
    }
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({
      value: newProps.value,
    })
  }

  updateInternalValue = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value,
    })
  }

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.currentTarget.select()
  }

  onKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  onBlur = () => {
    const { onChange } = this.props
    const { value } = this.state

    onChange(value)
  }

  render() {
    const { value } = this.state
    const { className } = this.props
    return (
      <input
        type='number'
        onChange={this.updateInternalValue}
        value={value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        className={className}
      />
    )
  }
}

export default Input
