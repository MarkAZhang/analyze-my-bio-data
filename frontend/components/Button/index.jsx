import cx from 'classnames'
import { Component } from 'react'
import PropTypes from 'prop-types'

import cs from './button.css'

class Button extends Component {
  render() {
    const { label, onClick, disabled } = this.props

    return (
      <div
        className={cx(cs.button, disabled && cs.disabled)}
        onClick={!disabled && onClick}
      >
        {label}
      </div>
    )
  }
}

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
