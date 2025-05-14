"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface DataPoint {
  category: string
  value: number
}

interface RiskRadarChartProps {
  data: DataPoint[]
}

export default function RiskRadarChart({ data }: RiskRadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const width = 250
    const height = 250
    const margin = 30
    const radius = Math.min(width, height) / 2 - margin

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    // Scale for the radius
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius])

    // Number of spokes (categories)
    const numSpokes = data.length

    // Angle between each spoke
    const angleSlice = (Math.PI * 2) / numSpokes

    // Function to calculate x,y coordinates based on angle and value
    const getCoordinates = (angle: number, value: number) => {
      return {
        x: rScale(value) * Math.cos(angle - Math.PI / 2),
        y: rScale(value) * Math.sin(angle - Math.PI / 2),
      }
    }

    // Draw the circular grid lines
    const gridLevels = 5
    const gridCircles = svg.selectAll(".gridCircle").data(d3.range(1, gridLevels + 1).reverse())

    gridCircles
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", (d) => (radius / gridLevels) * d)
      .style("fill", "none")
      .style("stroke", "rgba(255, 255, 255, 0.1)")
      .style("stroke-dasharray", "3,3")

    // Draw the axes (spokes)
    const axes = svg.selectAll(".axis").data(data).enter().append("g").attr("class", "axis")

    axes
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("stroke", "rgba(255, 255, 255, 0.3)")
      .style("stroke-width", "1px")

    // Add the labels for each axis
    axes
      .append("text")
      .attr("class", "legend")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(110) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(110) * Math.sin(angleSlice * i - Math.PI / 2))
      .text((d) => d.category)
      .style("fill", "rgba(255, 255, 255, 0.7)")
      .style("font-size", "10px")

    // Create the radar chart path
    const radarLine = d3
      .line<[number, number]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveLinearClosed)

    // Draw the radar chart path
    svg
      .append("path")
      .datum(data)
      .attr("class", "radarArea")
      .attr("d", radarLine as any)
      .style("fill", "rgba(255, 193, 7, 0.2)")
      .style("stroke", "rgba(255, 193, 7, 0.8)")
      .style("stroke-width", "2px")

    // Add circles at each data point
    svg
      .selectAll(".radarCircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", 4)
      .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("fill", (d) => {
        if (d.value < 30) return "rgba(40, 167, 69, 0.8)" // Green for low risk
        if (d.value < 70) return "rgba(255, 193, 7, 0.8)" // Yellow for medium risk
        return "rgba(220, 53, 69, 0.8)" // Red for high risk
      })
      .style("stroke", "#fff")
      .style("stroke-width", "1px")

    // Add value labels
    svg
      .selectAll(".radarValue")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "radarValue")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => {
        const coords = getCoordinates(angleSlice * i, d.value + 10)
        return coords.x
      })
      .attr("y", (d, i) => {
        const coords = getCoordinates(angleSlice * i, d.value + 10)
        return coords.y
      })
      .text((d) => d.value)
      .style("fill", (d) => {
        if (d.value < 30) return "rgba(40, 167, 69, 0.8)" // Green for low risk
        if (d.value < 70) return "rgba(255, 193, 7, 0.8)" // Yellow for medium risk
        return "rgba(220, 53, 69, 0.8)" // Red for high risk
      })
      .style("font-size", "9px")
      .style("font-weight", "bold")
  }, [data])

  return <svg ref={svgRef} className="mx-auto"></svg>
}
