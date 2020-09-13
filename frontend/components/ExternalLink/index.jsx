import { Component } from 'react'
import cx from 'classnames'

import cs from './external_link.css'

type Props = {
  className: string,
  href: string,
  children: React.Node
}

type State = {}

class ExternalLink extends Component<Props, State> {
  render() {
    const { href, className, children } = this.props

    return (
      <a
        href={href}
        className={cx(cs.externalLink, className)}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    )
  }
}

export default ExternalLink
