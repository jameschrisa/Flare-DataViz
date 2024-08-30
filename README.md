# Flare Heatmap Visualization

## Overview
This project provides a Vue.js component for visualizing flare activity over a 24-hour period using a heatmap. The visualization is powered by Apache ECharts and designed to show the status of multiple flares (on/off/partially on) throughout the day.

## Features
- Interactive heatmap visualization
- 24-hour time scale (x-axis)
- 100 individual flares (y-axis)
- Color-coded status representation (blue: off, red: on, intermediate colors: partially on)
- Visual map (range selector) for easy interpretation
- Responsive design that adapts to window resizing
- Customizable title
- Tooltip with detailed information on hover

## Technical Stack
- Vue.js 3 (Composition API)
- Apache ECharts
- JavaScript/ECMAScript 6+

## Component: FlareHeatmap

### Props
- `title` (String, optional): Custom title for the heatmap. Default: "Flare Status Heatmap (Visual Map on Top)"

### Usage
```vue
<template>
  <FlareHeatmap title="Custom Flare Heatmap Title" />
</template>

<script>
import FlareHeatmap from './path/to/FlareHeatmap.vue';

export default {
  components: {
    FlareHeatmap
  }
}
</script>
```

## Installation

1. Ensure you have Vue.js and ECharts installed in your project:
   ```
   npm install vue echarts
   ```

2. Copy the `FlareHeatmap.vue` file into your project's components directory.

3. Import and use the component as shown in the Usage section above.

## Data Generation
The component currently generates random data to simulate flare activity. In a production environment, you would replace the `generateData()` function with actual flare data from your system.

## Customization
- Color Scheme: The color range can be adjusted in the `visualMap.inRange.color` array within the component.
- Number of Flares: Modify the loop in `generateData()` to change the number of flares displayed.
- Time Resolution: The x-axis can be adjusted for different time resolutions by modifying the `xAxis.data` array.

## Future Enhancements
- Implement real-time data updates
- Add date selection for historical data viewing
- Create filters for specific flare groups or time ranges
- Implement zooming and panning for more detailed analysis

## Contributing
Contributions to improve the visualization or add new features are welcome. Please submit a pull request or open an issue to discuss proposed changes.

## License
[Insert your chosen license here]

