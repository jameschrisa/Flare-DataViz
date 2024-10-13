export function createHeatmap(svg, data, width, height, colorScale) {
    console.log('Creating heatmap with dimensions:', width, height);
    const cellSize = Math.min(width / 20, height / 6); // Ensure cells are square
    console.log('Cell size:', cellSize);

    // Calculate the actual width and height of the heatmap
    const actualWidth = cellSize * 20;
    const actualHeight = cellSize * 6;

    // Align the heatmap to the left and top
    const offsetX = 0;
    const offsetY = 0;

    svg.selectAll("rect.heatmap-cell").remove();
    svg.selectAll("text.cell-text").remove();

    const cells = svg.selectAll("rect.heatmap-cell")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "heatmap-cell")
        .attr("x", (d, i) => offsetX + (i % 20) * cellSize)
        .attr("y", (d, i) => offsetY + Math.floor(i / 20) * cellSize)
        .attr("width", cellSize)
        .attr("height", cellSize)
        .style("fill", d => d.value === -1 ? "white" : colorScale(d.value))
        .style("stroke", "lightgray")
        .style("stroke-width", "1px");

    svg.selectAll("text.cell-text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "cell-text")
        .attr("x", (d, i) => offsetX + (i % 20) * cellSize + cellSize / 2)
        .attr("y", (d, i) => offsetY + Math.floor(i / 20) * cellSize + cellSize / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-size", `${cellSize / 4}px`)
        .style("fill", "black")
        .text(d => d.flare);

    cells.on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);
}

function handleMouseOver(event, d) {
    d3.select(this)
        .attr("stroke", "black")
        .attr("stroke-width", "2px");

    let tooltipContent;
    if (d.value === -1) {
        tooltipContent = `Flare: ${d.flare}<br>Status: Flare is out of range`;
    } else {
        tooltipContent = `Flare: ${d.flare}<br>Value: ${d.value.toFixed(2)}%`;
    }

    d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px")
        .html(tooltipContent);
}

function handleMouseOut() {
    d3.select(this)
        .attr("stroke", "lightgray")
        .attr("stroke-width", "1px");

    d3.select(".tooltip").remove();
}
