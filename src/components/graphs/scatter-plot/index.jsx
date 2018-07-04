import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { select, event } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent, max } from 'd3-array';
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

    const margin = {top: 20, right: 10, bottom: 20, left: 20}, 
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
      let tipHtml =  `
        <h6>${data.player}</h6>
        <span><b>Pick:</b> ${data.pk}</span>
        <span><b>Year:</b> ${data.draft_yr}</span>
        <span><b>${yLabel}</b> ${data[yField]}</span>
      `;

      if (data.mvp) {
        tipHtml += `<span><b>MVP Awards</b> ${data.mvp}</span>`;
      }

      if (data.dpoy) {
        tipHtml += `<span><b>DPOY Awards</b> ${data.dpoy}</span>`;
      }

      return tipHtml;
    };

    const addLegendItem = (color, text, index, ele) => {
      ele.append('rect')
        .attr('x', '-120')
        .attr('y', (30 * index))
        .attr('fill', color)
        .attr('height', '10')
        .attr('width', '10');

      ele.append('text')
        .attr('x', '-100')
        .attr('y', 10 + (30 * index))
        .text(text);
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

    function make_x_axis() {        
      return axisBottom()
          .scale(x)
           .ticks(5)
    }
  
  function make_y_axis() {        
    return axisLeft()
        .scale(y)
        .ticks(5);
    }

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
      .attr('class', 'main axis')
      .call(xAxis);
    
    const yAxis = axisLeft()
      .scale(y);

    main.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('class', 'main axis date')
      .call(yAxis);
    
    const legend = main.append('g')
      .attr('transform', `translate(${width},20)`)
      .attr('class', 'legend');
    
    addLegendItem('#ff6b81', 'MVP / DPOY', 0, legend);
    addLegendItem('#7bed9f', 'All Star', 1, legend);
    addLegendItem('#1e90ff', 'No Awards', 2, legend);
    
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

    g.append('g')         
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + height + ')')
      .call(make_x_axis()
          .tickSize(-height, 0, 0)
          .tickFormat('')
      );

    g.append('g')         
      .attr('class', 'grid')
      .call(make_y_axis()
          .tickSize(-width, 0, 0)
          .tickFormat('')
      );

    const dots = g.selectAll('scatter-dots')
      .data(data)
      .enter().append('svg:circle')
        .attr('cx', 0)
        .attr('cy', height)
        .style('opacity', 0)
        .style('fill', d => {
          if (d.mvp || d.dpoy) {
            return '#ff6b81';
          }
          else if (d.all_star > 0) {
            return '#7bed9f';
          }
          return '#1e90ff';
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
