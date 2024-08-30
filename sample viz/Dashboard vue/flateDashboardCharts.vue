<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-md max-w-6xl mx-auto my-5 p-4">
    <h1 class="text-2xl font-bold mb-4">Flare Activity Dashboard</h1>
    
    <!-- Flare Activity Graph -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-2">Detailed Flare Activity Over 7 Days</h2>
      <!-- (Previous Flare Activity Graph code here) -->
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- On/Off Time Distribution Donut Chart -->
      <div>
        <h2 class="text-lg font-semibold mb-2">On/Off Time Distribution</h2>
        <div ref="onOffChartRef" style="width: 100%; height: 300px;"></div>
      </div>

      <!-- Key Metrics Gauges -->
      <div>
        <h2 class="text-lg font-semibold mb-2">Key Metrics</h2>
        <div class="grid grid-cols-2 gap-4">
          <div ref="efficiencyGaugeRef" style="width: 100%; height: 200px;"></div>
          <div ref="uptimeGaugeRef" style="width: 100%; height: 200px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'FlareDashboard',
  setup() {
    const onOffChartRef = ref(null)
    const efficiencyGaugeRef = ref(null)
    const uptimeGaugeRef = ref(null)

    const initOnOffChart = () => {
      const chart = echarts.init(onOffChartRef.value)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'On/Off Time',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 95, name: 'On Time' },
              { value: 5, name: 'Off Time' }
            ]
          }
        ]
      }
      chart.setOption(option)
    }

    const initGauge = (chartRef, name, value) => {
      const chart = echarts.init(chartRef.value)
      const option = {
        series: [
          {
            type: 'gauge',
            progress: {
              show: true,
              width: 18
            },
            axisLine: {
              lineStyle: {
                width: 18
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            axisLabel: {
              distance: 25,
              color: '#999',
              fontSize: 14
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 25,
              itemStyle: {
                borderWidth: 10
              }
            },
            title: {
              show: true,
              fontSize: 14
            },
            detail: {
              valueAnimation: true,
              fontSize: 30,
              offsetCenter: [0, '70%']
            },
            data: [
              {
                value: value,
                name: name
              }
            ]
          }
        ]
      }
      chart.setOption(option)
    }

    onMounted(() => {
      initOnOffChart()
      initGauge(efficiencyGaugeRef, 'Efficiency', 85)
      initGauge(uptimeGaugeRef, 'Uptime', 95)
    })

    return {
      onOffChartRef,
      efficiencyGaugeRef,
      uptimeGaugeRef
    }
  }
}
</script>
