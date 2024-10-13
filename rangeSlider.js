export function createRangeSlider(svg, width, height, updateCallback) {
    const barWidth = width * (9/24);
    const barHeight = 20;
    const barX = (width - barWidth) / 2;
    const barY = height + 5; // Reduced to 5px below the heatmap

    const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "color-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    gradient.selectAll("stop")
        .data([
            {offset: "0%", color: "#FFFF00"},
            {offset: "30%", color: "#FFA500"},
            {offset: "50%", color: "#FF4500"},
            {offset: "70%", color: "#FF0000"},
            {offset: "90%", color: "#8B0000"},
            {offset: "100%", color: "#404040"}
        ])
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    svg.append("rect")
        .attr("x", barX)
        .attr("y", barY)
        .attr("width", barWidth)
        .attr("height", barHeight)
        .style("fill", "url(#color-gradient)");

    const sliderScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, barWidth])
        .clamp(true);

    const slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", `translate(${barX}, ${barY + barHeight + 2})`);

    slider.append("line")
        .attr("class", "track")
        .attr("x1", sliderScale.range()[0])
        .attr("x2", sliderScale.range()[1]);

    const selectionRange = slider.append("line")
        .attr("class", "selection")
        .attr("x1", sliderScale(0))
        .attr("x2", sliderScale(100));

    const handle1 = slider.append("circle")
        .attr("class", "handle")
        .attr("r", 9)
        .attr("cx", sliderScale(0));

    const handle2 = slider.append("circle")
        .attr("class", "handle")
        .attr("r", 9)
        .attr("cx", sliderScale(100));

    // Add tick marks
    const tickValues = [0, 20, 40, 60, 80, 100];
    slider.selectAll(".tick")
        .data(tickValues)
        .enter()
        .append("line")
        .attr("class", "tick")
        .attr("x1", d => sliderScale(d))
        .attr("x2", d => sliderScale(d))
        .attr("y1", 0)
        .attr("y2", 10)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    slider.selectAll(".tick-label")
        .data(tickValues)
        .enter()
        .append("text")
        .attr("class", "tick-label")
        .attr("x", d => sliderScale(d))
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .text(d => d);

    function updateRange() {
        const value1 = sliderScale.invert(+handle1.attr("cx"));
        const value2 = sliderScale.invert(+handle2.attr("cx"));
        const minValue = Math.min(value1, value2);
        const maxValue = Math.max(value1, value2);
        selectionRange
            .attr("x1", sliderScale(minValue))
            .attr("x2", sliderScale(maxValue));
        updateCallback([minValue, maxValue]);
    }

    const drag = d3.drag()
        .on("start.interrupt", () => slider.interrupt())
        .on("start drag", (event, d) => {
            const handle = d3.select(event.sourceEvent.target);
            const newValue = sliderScale.invert(event.x);
            handle.attr("cx", sliderScale(newValue));
            updateRange();
        });

    handle1.call(drag);
    handle2.call(drag);

    // Style the slider
    slider.select(".track")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.3)
        .attr("stroke-width", 10)
        .attr("stroke-linecap", "round");

    slider.select(".selection")
        .attr("stroke", "#4CAF50")
        .attr("stroke-width", 10)
        .attr("stroke-linecap", "round");

    slider.selectAll(".handle")
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.5)
        .attr("stroke-width", 1.25)
        .attr("cursor", "pointer");

    // Initial update
    updateRange();
}
