import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { select, event } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent, max, min } from 'd3-array';
import { transition } from 'd3-transition';
import './index.css';

class ScatterPlot extends Component {
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
    const { data, xField, yField, xLabel, yLabel } = this.props;
    const chartHeight = this.props.height;
    const chartWidth = this.props.width;

    const margin = {top: 20, right: 15, bottom: 60, left: 60}, 
        width = chartWidth - margin.left - margin.right,
        height = chartHeight - margin.top - margin.bottom;

    const node = this.node;

    select(node).selectAll('svg > *').remove();

    const x = scaleLinear()
      .domain([0, max(data, function(d) { return d[xField]; })])
      .range([ 0, width ]);
    
    const y = scaleLinear()
      .domain(extent(data, function(d) { return d[yField]; }))
      .range([ height, 0 ]);
    
    const tooltip = select(node).append('div')	
      .attr('class', 'tooltip')				
      .style('opacity', 0);
    
    const tooltipHtml = (data) => {
      return `
        <h6>${data.player}</h6>
        <span><b>Pick:</b> ${data.pk}</span>
        <span><b>Year:</b> ${data.draft_yr}</span>
        <span><b>${yLabel}</b> ${data[yField]}</span>
      `;
    };

    const showTooltip = (data) => {
      tooltip.style('opacity', .9);		
      tooltip.html(tooltipHtml(data))
        .style('left', (event.pageX) + 10 + 'px')		
        .style('top', (event.pageY - 28) + 'px');
    };

    const hideTooltip = () => {
      tooltip.style('opacity', 0);	
    };

    data.forEach(player => {
      const RANGE = 0.10;
      const randomJitter = value => (Math.random() * ((value + RANGE) - (value - RANGE)) + (value - RANGE)).toFixed(3);
      player.xJitter = randomJitter(player[xField]);
      player.yJitter = randomJitter(player[yField]);
    });

    const main = select(node).select('svg').append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'main');
    
    const xAxis = axisBottom()
      .scale(x);

    main.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'main axis date')
      .call(xAxis);
    
    const yAxis = axisLeft()
      .scale(y);

    main.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('class', 'main axis date')
      .call(yAxis);
    
    main.append('text')
      .attr('class', 'label')
      .attr('x', width)
      .attr('y', height - 6)
      .style('text-anchor', 'end')
      .text(xLabel);
    
    main.append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(yLabel);
    
    const g = main.append('svg:g'); 

    const dots = g.selectAll('scatter-dots')
      .data(data)
      .enter().append('svg:circle')
        .attr('cx', 0)
        .attr('cy', height)
        .style('opacity', 0)
        .style('fill', d => {
          if (d.all_star > 0) {
            return 'red';
          }
          return 'blue';
        })
        .on('mouseover', player => showTooltip(player))
        .on('mouseout', hideTooltip)
        .attr('r', 8);
    
    dots
      .transition()
      .attr('cx', d => x(d['xJitter']))
      .attr('cy', d => y(d['yJitter']))
      .style('opacity', 1)
      .delay((d, i) => 150 + i * 5)
      .duration(1500);
  }
  render() {
    const { height, width } = this.props;

    return (
      <div className='ScatterPlot' ref={node => (this.node = node)}>
        <svg width={width} height={height} />
      </div>
    );
  }
}
export default ScatterPlot;
