// Pretty-optionated Dropdown. The Menu styling is fixed.
// However, you can provide the Dropdown itself as a child node.
import * as React from 'react'
import enhanceWithClickOutside from 'react-click-outside'

import Icon from '../Icon'

import cs from './styles.css'

type Props = {
  open: boolean,
  onChange: boolean => void,
  label: string,
  children: React.Node,
}

class Dropdown extends React.Component<Props> {
  toggle = () => {
    const { onChange, open } = this.props
    onChange(!open)
  }

  handleClickOutside = () => {
    const { onChange } = this.props
    onChange(false)
  }

  render() {
    const {
      open, label, children,
    } = this.props

    return (
      <div className={cs.dropdownContainer}>
        <div className={cs.dropdownMenu} onClick={this.toggle}>
          <div>{label}</div>
          <div className={cs.fill} />
          <Icon
            glyph={open ? 'up-arrow' : 'down-arrow'}
            className={cs.arrow}
          />
        </div>
        {open && (
          <div className={cs.dropdown}>
            {children}
          </div>
        )}
      </div>
    )
  }
}

// Export inner component for testing only.
export { Dropdown as InnerDropdown }

export default enhanceWithClickOutside(Dropdown)
