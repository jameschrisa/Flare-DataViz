<template>
  <div class="flare-dashboard">
    <h1>Flare Performance Dashboard</h1>
    
    <!-- Flare Performance Heatmap -->
    <div class="chart-container">
      <h2>Flare Performance Heatmap</h2>
      <div ref="heatmapChart" style="width: 100%; height: 400px;"></div>
    </div>

    <!-- Flare Status Overview -->
    <div class="chart-container">
      <h2>Flare Status Overview</h2>
      <div ref="statusChart" style="width: 100%; height: 400px;"></div>
    </div>

    <!-- Efficiency Distribution -->
    <div class="chart-container">
      <h2>Efficiency Distribution</h2>
      <div ref="distributionChart" style="width: 100%; height: 400px;"></div>
    </div>

    <!-- Efficiency Trend -->
    <div class="chart-container">
      <h2>Efficiency Trend</h2>
      <div ref="trendChart" style="width: 100%; height: 400px;"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'FlareDashboard',
  setup() {
    const heatmapChart = ref(null)
    const statusChart = ref(null)
    const distributionChart = ref(null)
    const trendChart = ref(null)

    const initHeatmapChart = () => {
      const chart = echarts.init(heatmapChart.value)
      const option = {
        tooltip: {
          position: 'top'
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: ['Flare 1', 'Flare 2', 'Flare 3', 'Flare 4', 'Flare 5'],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [{
          name: 'Efficiency',
          type: 'heatmap',
          data: [[0,0,81],[0,1,87],[0,2,86],[0,3,85],[0,4,90],[0,5,88],[0,6,87],
                 [1,0,80],[1,1,88],[1,2,89],[1,3,88],[1,4,86],[1,5,90],[1,6,91],
                 [2,0,82],[2,1,89],[2,2,90],[2,3,91],[2,4,87],[2,5,86],[2,6,88],
                 [3,0,85],[3,1,86],[3,2,87],[3,3,88],[3,4,89],[3,5,90],[3,6,85],
                 [4,0,88],[4,1,89],[4,2,90],[4,3,91],[4,4,92],[4,5,89],[4,6,86]],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      chart.setOption(option)
    }

    const initStatusChart = () => {
      const chart = echarts.init(statusChart.value)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['On', 'Off', 'Maintenance']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['Group A', 'Group B', 'Group C', 'Group D', 'Group E']
          }
        ],
        series: [
          {
            name: 'On',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390]
          },
          {
            name: 'Off',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90]
          },
          {
            name: 'Maintenance',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [60, 72, 71, 74, 70]
          }
        ]
      }
      chart.setOption(option)
    }

    const initDistributionChart = () => {
      const chart = echarts.init(distributionChart.value)
      const option = {
        title: [
          {
            text: 'Efficiency Distribution',
            left: 'center'
          },
        ],
        dataset: [
          {
            source: [
              [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980],
              [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790]
            ]
          },
          {
            transform: {
              type: 'boxplot',
              config: { itemNameFormatter: 'Group {value}' }
            }
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1
          }
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'Efficiency',
          splitArea: {
            show: true
          }
        },
        series: [
          {
            name: 'boxplot',
            type: 'boxplot',
            datasetIndex: 1
          },
          {
            name: 'outlier',
            type: 'scatter',
            datasetIndex: 2
          }
        ]
      }
      chart.setOption(option)
    }

    const initTrendChart = () => {
      const chart = echarts.init(trendChart.value)
      const option = {
        title: {
          text: 'Efficiency Trend'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Overall Efficiency', 'Target Efficiency']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Overall Efficiency',
            type: 'line',
            stack: 'Total',
            data: [82, 85, 88, 87, 89, 91, 90]
          },
          {
            name: 'Target Efficiency',
            type: 'line',
            stack: 'Total',
            data: [85, 85, 85, 85, 85, 85, 85]
          }
        ]
      }
      chart.setOption(option)
    }

    onMounted(() => {
      initHeatmapChart()
      initStatusChart()
      initDistributionChart()
      initTrendChart()
    })

    return {
      heatmapChart,
      statusChart,
      distributionChart,
      trendChart
    }
  }
}
</script>

<style scoped>
.flare-dashboard {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.chart-container {
  margin-bottom: 40px;
}
h1 {
  text-align: center;
  color: #333;
}
h2 {
  color: #666;
}
</style>
