# echartsMixins
通用echarts图表生成混入，实现快速生成echarts图表，并实现随窗口变化，可通过自定义其他操作

## 使用
```vue
<template>
  <div>
    <div id="sex-echarts" style="height: 300px"></div>
    <div id="income-echarts" style="height: 300px"></div>
  </div>
</template>
<script>
import echartsMixins from '../mixins/echartsMixins'
export default {
  mixins: [echartsMixins],
  methods: {
    createPieChart() {
      this.renderPieChart('性别', 'sex-echarts', [{name: "男", value: 10}, {name: "女", value: 6}], ['#409EFF', '#F56C6C'])
    },
    createLineChart() {
      this.renderLineChart('income-echarts', ["星期一","星期二"], [{name: "收入", data: [100, 60]}, {name: "支出", data: [30, 20]}], ['#37cc8f', '#fa904e'])
    },
    customActions() {
      for (let id in this.myCharts) {
        // 重新适应图表大小
        this.myCharts[id].resize()
      }
    }
  }
}
</script>
```
