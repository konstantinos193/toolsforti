"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DataPoint {
  date: string
  score: number
}

interface RiskTimelineProps {
  data: DataPoint[]
}

export default function RiskTimeline({ data }: RiskTimelineProps) {
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
      .domain(data.map((d) => d.date))
      .range([0, chartWidth])
      .padding(0.3)

    // Y scale
    const y = d3.scaleLinear().domain([0, 100]).range([chartHeight, 0])

    // Define the line
    const line = d3
      .line<DataPoint>()
      .x((d) => (x(d.date) || 0) + x.bandwidth() / 2)
      .y((d) => y(d.score))

    // Add the line path
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "rgba(255, 193, 7, 0.8)")
      .attr("stroke-width", 2)
      .attr("d", line)

    // Add the dots
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => (x(d.date) || 0) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.score))
      .attr("r", 5)
      .style("fill", (d) => {
        if (d.score < 30) return "rgba(40, 167, 69, 0.8)" // Green for low risk
        if (d.score < 70) return "rgba(255, 193, 7, 0.8)" // Yellow for medium risk
        return "rgba(220, 53, 69, 0.8)" // Red for high risk
      })
      .style("stroke", "#fff")
      .style("stroke-width", "1px")

    // Add value labels above dots
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("x", (d) => (x(d.date) || 0) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.score) - 10)
      .text((d) => d.score)
      .style("fill", "white")
      .style("font-size", "10px")

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("fill", "rgba(255, 255, 255, 0.7)")
      .style("font-size", "9px")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")

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
