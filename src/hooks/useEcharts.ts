// The definition suffixes of the series types are seriesOption
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
} from 'echarts/charts'
// The definition of the component type is componentOption
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import { useAppStore } from '@/store'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'

import {
  DatasetComponent, // Data set component
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent, // Built -in data converter component (filter, sort)
} from 'echarts/components'
import * as echarts from 'echarts/core'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useTemplateRef } from 'vue'

// By ComposeOption to combine a type of Option of only components and charts
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
  | ToolboxComponentOption
  | RadarSeriesOption
>

// Register the necessary component
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  ToolboxComponent,
  RadarChart,
])

/**
 * ECharts Hooks function
 * @description The chart component is introduced as required.
 */
export function useEcharts(ref: string, chartOptions: Ref<ECOption>) {
  const el = useTemplateRef<HTMLLIElement>(ref)

  const appStore = useAppStore()

  let chart: echarts.ECharts | null = null

  const { width, height } = useElementSize(el)

  const isRendered = computed(() => Boolean(el && chart))

  async function render() {
    // Wide or high without rendering when there is no existence
    if (!width || !height)
      return

    const chartTheme = appStore.colorMode ? 'dark' : 'light'
    await nextTick()
    if (el) {
      chart = echarts.init(el.value, chartTheme)
      update(chartOptions.value)
    }
  }

  function update(updateOptions: ECOption) {
    if (isRendered.value)
      chart!.setOption({ backgroundColor: 'transparent', ...updateOptions })
  }

  function destroy() {
    chart?.dispose()
    chart = null
  }

  watch([width, height], async ([newWidth, newHeight]) => {
    if (isRendered.value && newWidth && newHeight)
      chart?.resize()
  })

  watch(chartOptions, (newValue) => {
    update(newValue)
  })

  onMounted(() => {
    render()
  })
  onUnmounted(() => {
    destroy()
  })

  return {
    destroy,
    update,
  }
}
