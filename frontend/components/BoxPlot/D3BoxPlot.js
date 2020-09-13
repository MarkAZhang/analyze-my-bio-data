// Demo box plot.

import { select, mouse } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { bisector, quantile } from 'd3-array'
import { nest } from 'd3-collection'
import {
  merge, map, orderBy,
} from 'lodash/fp'

import DATA from './data.csv'
import cs from './d3_box_plot.css'

// NOTE: Not guaranteed to handle data transitions yet!
const DEFAULT_OPTIONS = {
  // Margin around the plot area of the chart. Chart axis can overlap with these.
  marginTop: 60,
  marginRight: 40,
  marginBottom: 40,
  marginLeft: 40,
  labelBuffer: 40,
}

const getClosestDataIndexForChartX = bisector(d => d.x).left

export default class D3BoxPlot {
  constructor(container, options = {}) {
    this.options = merge(DEFAULT_OPTIONS, options)
    this.container = select(container)
    this.initialize()
    this.updateData(DATA)
    this.pinnedIndex = null
    this.mouseOver = false
  }

  // This is the dimensions of the plot area of the chart.
  // Ex: the axis are at the edge of this plot area.
  getChartDimensions = () => {
    const rect = this.container.node().getBoundingClientRect()

    return {
      width: rect.width - this.options.marginLeft - this.options.marginRight,
      height: rect.height - this.options.marginTop - this.options.marginBottom,
    }
  }

  handleMouseOver = () => {
    this.mouseOver = true
    this.focusLayer.style('opacity', 1)
  }

  // pin to the closest data value to x.
  handlePinFocus = x => {
    const index = getClosestDataIndexForChartX(this.data, x)
    this.pinnedIndex = index
    if (!this.mouseOver) {
      this.focusDataPoint(this.pinnedIndex)
      this.focusLayer.style('opacity', 1)
    }
  }

  focusDataPoint = index => {
    const dim = this.getChartDimensions()
    const selectedData = this.data[index]

    const tooltipX = this.x(selectedData.x)
    const tooltipY = this.y(selectedData.y)

    this.focusCircle
      .attr('cx', tooltipX)
      .attr('cy', tooltipY)

    const textAnchor = tooltipX < dim.width / 2 ? 'start' : 'end'

    this.focusTextX
      .html(`Infection rate: ${selectedData.x}%`)
      .attr('x', tooltipX)
      .attr('y', tooltipY - 30)
      .attr('text-anchor', textAnchor)
    this.focusTextY
      .html(`Tests required: ${selectedData.y}%`)
      .attr('x', tooltipX)
      .attr('y', tooltipY - 15)
      .attr('text-anchor', textAnchor)
    this.focusTextXOutline
      .html(`Infection rate: ${selectedData.x}%`)
      .attr('x', tooltipX)
      .attr('y', tooltipY - 30)
      .attr('text-anchor', textAnchor)
    this.focusTextYOutline
      .html(`Tests required: ${selectedData.y}%`)
      .attr('x', tooltipX)
      .attr('y', tooltipY - 15)
      .attr('text-anchor', textAnchor)
  }

  handleMouseMove = () => {
    const chartX = this.x.invert(mouse(this.g.node())[0])
    const index = getClosestDataIndexForChartX(this.data, chartX)
    this.focusDataPoint(index)
  }

  handleMouseOut = () => {
    this.mouseOver = false
    if (this.pinnedIndex !== null) {
      this.focusDataPoint(this.pinnedIndex)
    } else {
      this.focusLayer.style('opacity', 0)
    }
  }

  initialize = () => {
    const rect = this.container.node().getBoundingClientRect()

    this.svg = this.container
      .append('svg')
        .attr('width', rect.width)
        .attr('height', rect.height)
        .attr('class', cs.svg)

    // Set up container.
    this.g = this.svg
      .append('g')
        .attr('transform', `translate(${this.options.marginLeft}, ${this.options.marginTop})`)

    this.dataLayer = this.g.append('g').attr('class', 'data-layer')
    this.focusLayer = this.g.append('g').attr('class', 'focus-layer')
      .style('opacity', 0)
  }

  updateData = data => {
    this.data = data
    const dim = this.getChartDimensions()

    const sumstat = nest() // nest function allows to group the calculation per level of a factor
      .key(d => d.category)
      .rollup(d => {
        const sortedValues = map('value', orderBy(['value'], ['asc'], d))
        const q1 = quantile(sortedValues, 0.25)
        const median = quantile(sortedValues, 0.5)
        const q3 = quantile(sortedValues, 0.75)
        const interQuantileRange = q3 - q1
        const minVal = q1 - 1.5 * interQuantileRange
        const maxVal = q3 + 1.5 * interQuantileRange
        return {
          q1,
          median,
          q3,
          interQuantileRange,
          min: minVal,
          max: maxVal,
        }
      })
      .entries(data)

    // X scale
    this.x = scaleBand()
      .domain(['B', 'A'])
      .range([0, dim.width])
      .paddingInner(1)
      .paddingOuter(0.5)

    // Draw a fake X axis without ticks or labels.
    this.dataLayer.append('g')
      .attr('class', cs.axis)
      .append('path')
        .attr('d', `M 0 ${dim.height} H ${dim.width}`)

    // Y scale
    this.y = scaleLinear()
      .domain([0, 10])
      .range([dim.height, 0])

    // Draw a fake Y axis without ticks or labels.
    this.dataLayer.append('g')
      .attr('class', cs.axis)
      .append('path')
        .attr('d', `M 0 0 V ${dim.height}`)

    // Draw the main vertical line
    this.dataLayer
      .selectAll('vertLines')
      .data(sumstat)
      .enter()
      .append('line')
      .attr('x1', d => this.x(d.key))
      .attr('y1', d => this.y(d.value.min))
      .attr('x2', d => this.x(d.key))
      .attr('y2', d => this.y(d.value.max))
      .attr('class', cs.vertLine)

    // Draw rectangle for the main box
    const boxWidth = 50
    this.dataLayer
      .selectAll('boxes')
      .data(sumstat)
      .enter()
      .append('rect')
      .attr('x', d => this.x(d.key) - boxWidth / 2)
      .attr('y', d => this.y(d.value.q3))
      .attr('height', d => this.y(d.value.q1) - this.y(d.value.q3))
      .attr('width', boxWidth)
      .attr('class', cs.box)

    // Draw the median line
    this.dataLayer
      .selectAll('medianLines')
      .data(sumstat)
      .enter()
      .append('line')
        .attr('x1', d => this.x(d.key) - boxWidth / 2)
        .attr('y1', d => this.y(d.value.median))
        .attr('x2', d => this.x(d.key) + boxWidth / 2)
        .attr('y2', d => this.y(d.value.median))
        .attr('class', cs.medianLine)

    // Draw the p-value marker.
    this.dataLayer.append('g')
      .attr('class', cs.pValueMarker)
      .append('path')
        .attr('d', `M ${this.x('B')} -6 V -12 H ${this.x('A')} V -6`)

    this.dataLayer.append('g')
      .attr('class', cs.pValue)
      .append('text')
        .text('***')
        .attr('transform', `translate(${(this.x('B') + this.x('A')) / 2}, -13)`)
        .style('text-anchor', 'middle')

  }
}
