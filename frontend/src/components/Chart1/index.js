import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart1 = (props) => {
  const svgRef = useRef();

  useEffect(() => {
    // Sample data
    const data = [
      { name: 'Floor A', value: props.data.ab },
      { name: 'Floor B', value: props.data.ac },
      { name: 'Floor C', value: props.data.ad },
      { name: 'IPI', value: props.data.ae },
      { name: 'DML', value: props.data.af },
      { name: 'HR', value: props.data.ag },
    ];

    // Dimensions and margins
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear previous SVG content if any
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    // Bars
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'green')
      .on('mouseover', function () { d3.select(this).attr('fill', 'red'); })
      .on('mouseout', function () { d3.select(this).attr('fill', 'green'); });

    // X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('y', 0)
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(45)')
      .style('text-anchor', 'start');

    // Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y));

    // Add labels
    svg.append('text')
      .attr('class', 'axis-label')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 10)
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'middle')
      .text(props.nameX);

    svg.append('text')
      .attr('class', 'axis-label')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 5)
      .style('text-anchor', 'middle')
      .text(props.nameY);

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Chart1;
