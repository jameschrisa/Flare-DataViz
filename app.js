import { createHeatmap } from './heatmap.js';

let globalData = [];
let globalColorScale;

function initializeHeatmap() {
    console.log('Initializing heatmap');
    const margin = { top: 20, right: 20, bottom: 20, left: 0 }; // Removed left margin
    const heatmapContainer = document.getElementById('heatmap');
    const containerWidth = heatmapContainer.clientWidth;
    const containerHeight = heatmapContainer.clientHeight;
    const heatmapWidth = containerWidth - margin.left - margin.right;
    const heatmapHeight = containerHeight - margin.top - margin.bottom;

    console.log('Container dimensions:', containerWidth, containerHeight);
    console.log('Heatmap dimensions:', heatmapWidth, heatmapHeight);

    const svg = d3.select("#heatmap")
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    globalData = generateData();
    console.log('Data generated:', globalData.length, 'items');

    globalColorScale = d3.scaleLinear()
        .domain([0, 30, 50, 70, 90, 100])
        .range(['#FFFF00', '#FFA500', '#FF4500', '#FF0000', '#8B0000', '#404040']);

    createHeatmap(svg, globalData, heatmapWidth, heatmapHeight, globalColorScale);
    createColorLegend();

    // Create noUiSlider
    const sliderContainer = document.getElementById('slider');
    noUiSlider.create(sliderContainer, {
        start: [0, 100],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        },
        step: 1
    });

    sliderContainer.noUiSlider.on('update', function (values, handle) {
        const range = values.map(Number);
        updateHeatmap(range);
    });
}

function createColorLegend() {
    const legendWidth = document.getElementById('color-legend').clientWidth;
    const legendHeight = 20;

    const legendSvg = d3.select("#color-legend")
        .append("svg")
        .attr("width", "100%")
        .attr("height", legendHeight);

    const gradient = legendSvg.append("defs")
        .append("linearGradient")
        .attr("id", "color-legend-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    const colorStops = [
        { offset: "0%", color: "#FFFF00" },
        { offset: "30%", color: "#FFA500" },
        { offset: "50%", color: "#FF4500" },
        { offset: "70%", color: "#FF0000" },
        { offset: "90%", color: "#8B0000" },
        { offset: "100%", color: "#404040" }
    ];

    gradient.selectAll("stop")
        .data(colorStops)
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    legendSvg.append("rect")
        .attr("width", "100%")
        .attr("height", legendHeight)
        .style("fill", "url(#color-legend-gradient)");
}

function updateHeatmap(range) {
    const filteredData = globalData.map(d => ({
        ...d,
        value: (d.value >= range[0] && d.value <= range[1]) ? d.value : -1
    }));
    const svg = d3.select("#heatmap svg g");
    const width = parseFloat(d3.select("#heatmap").style("width"));
    const height = parseFloat(d3.select("#heatmap").style("height"));
    createHeatmap(svg, filteredData, width, height, globalColorScale);
}

function generateData() {
    const data = [];
    const totalFlares = 120; // 6x20 grid
    const highLevelFlares = Math.floor(totalFlares * 0.93);
    const offlineFlares = 2;

    for (let flare = 0; flare < totalFlares; flare++) {
        let value;
        if (flare < highLevelFlares) {
            value = Math.random() * 30 + 70; // Random value between 70 and 100
        } else if (flare >= totalFlares - offlineFlares) {
            value = -1; // Offline flares
        } else {
            value = Math.random() * 69; // Random value between 0 and 69
        }
        data.push({ flare: flare + 1, value }); // Assign sequential flare numbers
    }

    return data;
}

window.onload = function() {
    console.log('Window loaded, initializing heatmap');
    initializeHeatmap();

    window.addEventListener('resize', debounce(function() {
        console.log('Resizing');
        d3.select("#heatmap").selectAll("*").remove();
        d3.select("#color-legend").selectAll("*").remove();
        document.getElementById('slider').noUiSlider.destroy();
        initializeHeatmap();
    }, 250));
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('App.js loaded and executed');
