<template>
  <!-- Main container with Tailwind CSS classes for styling -->
  <div class="bg-white border border-gray-200 rounded-lg shadow-md max-w-4xl mx-auto my-5">
    <!-- Header section -->
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-bold text-gray-800">Detailed Flare Activity Over 7 Days</h2>
    </div>
    <!-- Content section -->
    <div class="p-4">
      <!-- Hour labels at the top -->
      <div class="flex mb-1 ml-20">
        <div v-for="hour in 24" :key="hour" class="flex-1 text-center text-xs font-semibold text-gray-600">
          {{ (hour - 1).toString().padStart(2, '0') }}
        </div>
      </div>
      <!-- Day rows -->
      <div v-for="(day, index) in flareData" :key="index" class="flex h-8 mb-1 items-center">
        <!-- Date label -->
        <div class="w-20 text-sm text-right pr-2 font-semibold text-gray-700">
          {{ day.date }}
        </div>
        <!-- Flare activity bar -->
        <div class="flex-grow h-5 bg-orange-400 relative">
          <!-- Off periods -->
          <div
            v-for="(offPeriod, offIndex) in day.offPeriods"
            :key="offIndex"
            class="absolute h-full bg-blue-400"
            :style="{
              left: `${offPeriod.start}%`,
              width: `${offPeriod.duration}%`
            }"
          ></div>
        </div>
      </div>
      <!-- Legend -->
      <div class="mt-4 text-center text-sm">
        <span class="inline-block w-4 h-4 bg-orange-400 mr-2"></span>
        <span class="mr-4">On</span>
        <span class="inline-block w-4 h-4 bg-blue-400 mr-2"></span>
        <span>Off</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FlareActivityGraph',
  setup() {
    // Function to generate random off periods for a day
    const generateRandomOffPeriods = () => {
      const offPeriods = []
      // Generate 3 to 5 off periods
      const numOffPeriods = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < numOffPeriods; i++) {
        offPeriods.push({
          start: Math.random() * 95, // Random start position (0-95%)
          duration: Math.random() * 0.5 + 0.2 // Random duration (0.2-0.7%)
        })
      }
      // Sort off periods by start time
      return offPeriods.sort((a, b) => a.start - b.start)
    }

    // Generate flare data for the last 7 days
    const flareData = ref(
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          offPeriods: generateRandomOffPeriods()
        }
      }).reverse() // Reverse to show most recent date last
    )

    return {
      flareData
    }
  }
}
</script>
