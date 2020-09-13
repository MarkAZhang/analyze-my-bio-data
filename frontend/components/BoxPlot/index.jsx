// React wrapper for d3 viz.
import * as React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import D3BoxPlot from './D3BoxPlot'
import cs from './box_plot.css'

class BoxPlot extends React.Component {
  componentDidMount() {
    this.boxPlot = new D3BoxPlot(this.container)
  }

  render() {
    const { className } = this.props
    return (
      <div
        className={cx(className, cs.boxPlot)}
        ref={container => { this.container = container }}
      />
    )
  }
}

BoxPlot.propTypes = {
  className: PropTypes.string,
}

export default BoxPlot
