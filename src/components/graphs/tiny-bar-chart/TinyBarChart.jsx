import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import './TinyBarChart.css';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart() {
    const { height, width, data, index, max, color } = this.props;
    const node = this.node;
    
    const xScale = scaleLinear()
      .domain([0, max])
      .range([0, max]);
    
    select(node).selectAll("svg > *").remove();

    var g = select(node).append('g');

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    var bar = g
      .selectAll('rect')
      .style('fill', color)
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', height)
      .attr('width', 0);
    
    g.append('text')
      .data(data)
      .attr('class', 'label')
      .attr('y', height - height/3)
      .attr('x', (d) => xScale(d) + 7)
      .text(d => d);
    
    bar
      .transition()
      .attr('width', d => xScale(d))
      .delay(() => 200 + index * 50)
      .duration(800);
  }
  render() {
    const { height, width } = this.props;
    return (
      <div className='TinyBarChart'>
        <svg ref={node => (this.node = node)} width={width} height={height} />
      </div>
    );
  }
}
export default BarChart;
