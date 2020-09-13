import cx from 'classnames'
import { Component } from 'react'
import PropTypes from 'prop-types'

import cs from './radio_button.css'

class RadioButton extends Component {
  render() {
    const { disabled, selected, onClick } = this.props

    return (
      <div
        className={cx(cs.radioButton, disabled && cs.disabled, selected && cs.selected)}
        onClick={onClick}
      >
        <div className={cs.inner} />
      </div>
    )
  }
}

RadioButton.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default RadioButton
