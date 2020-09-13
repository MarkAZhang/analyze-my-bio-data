import { Component } from 'react'
import cx from 'classnames'

import cs from './section.css'

type Props = {
  children?: React.Node,
  className?: String,
}

export default class Section extends Component<Props, State> {
  render() {
    const { children, className } = this.props
    return (
      <div className={cx(cs.section, className)}>
        {children}
      </div>
    )
  }
}
