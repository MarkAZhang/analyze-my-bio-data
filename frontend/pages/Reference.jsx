import { Component } from 'react'

import ExternalLink from '~/components/ExternalLink'

import cs from './reference.css'

type Props = {
  name: string,
  url: string,
  citation: string,
}

export default class Reference extends Component<Props, State> {
  render() {
    const { name, url, citation } = this.props
    return (
      <div className={cs.reference}>
        <div className={cs.name}>
          {name} [<ExternalLink href={url} className={cs.link}>Link</ExternalLink>]
        </div>
        <div className={cs.citation}>{citation}</div>
      </div>
    )
  }
}