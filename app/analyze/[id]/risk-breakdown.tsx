"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface RiskFactor {
  name: string
  score: number
  color: string
}

interface RiskBreakdownProps {
  data: RiskFactor[]
}

export default function RiskBreakdown({ data }: RiskBreakdownProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const width = 300
    const height = 200
    const margin = { top: 20, right: 30, bottom: 40, left: 40 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, chartWidth])
      .padding(0.3)

    // Y scale
    const y = d3.scaleLinear().domain([0, 100]).range([chartHeight, 0])

    // Draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name) || 0)
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.score))
      .attr("height", (d) => chartHeight - y(d.score))
      .attr("fill", (d) => d.color)
      .attr("rx", 4)
      .attr("ry", 4)

    // Add value labels on top of bars
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("x", (d) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.score) - 5)
      .text((d) => d.score)
      .style("fill", "white")
      .style("font-size", "10px")

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "middle")
      .style("fill", "rgba(255, 255, 255, 0.7)")
      .style("font-size", "9px")

    // Add Y axis
    svg
      .append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("fill", "rgba(255, 255, 255, 0.7)")
      .style("font-size", "9px")

    // Add Y axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - chartHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "rgba(255, 255, 255, 0.7)")
      .style("font-size", "10px")
      .text("Risk Score")
  }, [data])

  return <svg ref={svgRef} className="mx-auto"></svg>
}
