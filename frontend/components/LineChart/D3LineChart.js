import { select, mouse } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { bisector } from 'd3-array'
import { line } from 'd3-shape'
import {
  merge, min, max, map,
} from 'lodash/fp'

import cs from './d3_line_chart.css'

// NOTE: Not guaranteed to handle data transitions yet!
const DEFAULT_OPTIONS = {
  // Margin around the plot area of the chart. Chart axis can overlap with these.
  marginTop: 30,
  marginRight: 30,
  marginBottom: 60,
  marginLeft: 60,
  labelBuffer: 40,
}

const getClosestDataIndexForChartX = bisector(d => d.x).left

export default class D3LineChart {
  constructor(container, data, options = {}) {
    this.options = merge(DEFAULT_OPTIONS, options)
    this.container = select(container)
    this.initialize()
    this.updateData(data)
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
    const dim = this.getChartDimensions()

    this.svg = this.container
      .append('svg')
        .attr('width', rect.width)
        .attr('height', rect.height)

    // Set up container.
    this.g = this.svg
      .append('g')
        .attr('transform', `translate(${this.options.marginLeft}, ${this.options.marginTop})`)

    this.dataLayer = this.g.append('g').attr('class', 'data-layer')
    this.focusLayer = this.g.append('g').attr('class', 'focus-layer')
      .style('opacity', 0)

    // Hover elements
    this.focusCircle = this.focusLayer
      .append('circle')
        .attr('class', cs.focusCircle)
        .attr('r', 4)

    this.focusTextXOutline = this.focusLayer
      .append('text')
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .attr('class', cs.focusTextOutline)

    this.focusTextYOutline = this.focusLayer
      .append('text')
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .attr('class', cs.focusTextOutline)

    this.focusTextX = this.focusLayer
      .append('text')
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .attr('class', cs.focusText)

    this.focusTextY = this.focusLayer
      .append('text')
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .attr('class', cs.focusText)

    // x-axis label
    this.dataLayer.append('text')
      .attr('class', cs.axisLabel)
      .attr('transform', `translate(${dim.width / 2}, ${dim.height + this.options.labelBuffer})`)
      .style('text-anchor', 'middle')
      .text('Infection Rate (%)')

    // text label for the y axis
    this.dataLayer.append('g')
        .attr('class', 'y-label')
        .attr('transform', `translate(${-this.options.labelBuffer - 5}, ${dim.height / 2})`)
        .append('text')
          .attr('class', cs.axisLabel)
          .attr('transform', 'rotate(-90)')
          .attr('dy', '1em')
          .style('text-anchor', 'middle')
          .text('Tests Required (% of patients)')

    this.svg
      .append('rect')
        .attr('class', 'mouse-event-layer')
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('width', rect.width)
        .attr('height', rect.height)
        .on('mouseover', this.handleMouseOver)
        .on('mousemove', this.handleMouseMove)
        .on('mouseout', this.handleMouseOut)
  }

  updateData = data => {
    this.data = data
    const dim = this.getChartDimensions()
    const xMin = min(map('x', data))
    const xMax = max(map('x', data))
    const yMin = min(map('y', data))
    const yMax = max(map('y', data))

    // Add X axis
    this.x = scaleLinear()
      .domain([xMin, xMax])
      .range([0, dim.width])

    this.dataLayer.append('g')
      .attr('transform', `translate(0, ${dim.height})`)
      .attr('class', cs.axis)
      .call(axisBottom(this.x))

    // Add Y axis
    this.y = scaleLinear()
      .domain([yMin, yMax])
      .range([dim.height, 0])

    this.dataLayer.append('g')
      .attr('class', cs.axis)
      .call(axisLeft(this.y))

    // Add the line
    this.dataLayer.append('path')
      .datum(data)
      .attr('class', cs.line)
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .attr('d', line()
        .x(d => this.x(d.x))
        .y(d => this.y(d.y)))
  }
}
