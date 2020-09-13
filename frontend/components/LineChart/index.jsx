// React wrapper for d3 viz.
import * as React from 'react'
import cx from 'classnames'

import D3LineChart from './D3LineChart'
import cs from './line_chart.css'

type Props = {
  data: Array<{x: number, y: number}>,
  pinnedX: number,
  className: string,
}

class LineChart extends React.Component<Props> {
  container: ?HTMLElement
  lineChart: D3LineChart

  componentDidMount() {
    const { data, pinnedX } = this.props
    this.lineChart = new D3LineChart(this.container, data)

    if (pinnedX) {
      this.lineChart.handlePinFocus(pinnedX)
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { pinnedX } = this.props
    if (pinnedX !== prevProps.pinnedX) {
      this.lineChart.handlePinFocus(pinnedX)
    }
  }

  render() {
    const { className } = this.props
    return (
      <div
        className={cx(className, cs.lineChart)}
        ref={container => { this.container = container }}
      />
    )
  }
}

export default LineChart
