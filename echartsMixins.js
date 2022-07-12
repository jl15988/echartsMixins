/**
 * @author jl15988
 * @since 2022-07-11
 * @description 通用echarts图表生成混入（需要特定数据格式），实现图表随窗口变化，可通过myCharts进行遍历自行其他操作
 * @copyright MIT License Copyright (c) 2022 jl15988
 */
export default {
  data() {
    return {
      myCharts: {}, // echarts初始化实例保存，键值为echarts渲染容器id，值为echarts实例
      resizeListeners: [] // echarts大小监听事件
    }
  },
  beforeDestroy() {
    // 销毁echarts大小监听事件
    this.resizeListeners.forEach(resizeListener => {
      window.removeEventListener('resize', resizeListener)
    })
  },
  methods: {
    initMyChart(id) {
      if (!this.myCharts[id]) {
        this.myCharts[id] = this.$echarts.init(document.getElementById(id))
      }
      return this.myCharts[id]
    },
    /**
     * @title 标题
     * @id 容器id
     * @data 图表数据，数据格式：[{name: "男", value: 10}, {name: "女", value: 6}]
     * @colors 自定义颜色，，数据格式：['#37cc8f', '#fa904e']，数据长度应与data数据长度相等
     * @description 生成饼图
     */
    renderPieChart(title, id, data, colors) {
      let myChart = this.initMyChart(id)
      const resizeListener = () => {
        myChart.resize()
      }
      this.resizeListeners.push(resizeListener)
      // 监听大小，自适应
      window.addEventListener('resize', resizeListener)
      let option = {
        title: {
          text: title,
          left: 'center',
          top: 10,
          textStyle: {
            color: '#6688bf'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 40,
          left: 'center'
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: data.sort(function(a, b) {
              return a.value - b.value
            }),
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 4,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 自定义颜色
      option = colors && colors.length ? Object.assign(option, {
        color: colors
      }) : option

      option && myChart.setOption(option)
    },
    /**
     * @id 容器id
     * @xLabels x轴数据，数据格式：["星期一","星期二"]
     * @data 图表数据，数据格式：[{name: "收入", data: [100, 60]}, {name: "支出", data: [30, 20]}]，data数据长度与xLabels数据长度应相等
     * @colors 自定义颜色，数据格式：['#37cc8f', '#fa904e']，数据长度应与data数据长度相等
     * @description 生成折线图
     */
    renderLineChart(id, xLabels, data, colors) {
      let legend = [] // 实例图标
      data.map(item => {
        Object.assign(item, {
          type: 'line'
        }) // 添加类型
        legend.push(item.name)
      })
      let myChart = this.initMyChart(id)
      // 监听大小，自适应
      const resizeListener = () => {
        myChart.resize()
      }
      this.resizeListeners.push(resizeListener)
      window.addEventListener('resize', resizeListener)
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legend
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
          data: xLabels
        },
        yAxis: {
          type: 'value'
        },
        series: data
      }

      // 自定义颜色
      option = colors && colors.length ? Object.assign(option, {
        color: colors
      }) : option

      option && myChart.setOption(option)
    }
  }
}
