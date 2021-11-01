<template>
  <div :style="{ width: '100%', height: '100%' }">
    <div id="salebar" :style="{ width: '100%', height: '60%' }"></div>
    <div id="testbar" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Data",
  data() {
    return {
      saleBar: null,
      saleData: [],
      testBar: null,
      maxData: ["1213", "3214", "889", "4231"],
      timer: null,
    };
  },
  methods: {
    drawBar(saleData) {
      this.saleBar = echarts.init(document.getElementById("salebar"));
      const option = {
        title: { text: "销售统计柱状图" },
        tooltip: {},
        xAxis: {
          realtimeSort: true,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          data: [
            "RTX2060",
            "RTX2060SUPER",
            "RTX2070",
            "RTX2070SUPER",
            "RTX2080",
            "RTX2080SUPER",
            "RTX3060",
            "RTX3060Ti",
            "RTX3070",
            "RTX3070Ti",
            "RTX3080",
            "RTX3080Ti",
            "RTX3090",
            "TiTan RTX",
          ],
          axisLabel: {
            interval: 0, //类目全显
            rotate: -45, //顺时针旋转45度
          },
          animationDuration: 3000,
          animationDurationUpdate: 3000,
        },
        yAxis: {
          max: "dataMax",
        },
        series: [
          {
            data: saleData,
            type: "bar",
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              valueAnimation: true,
            },
          },
        ],
        animationDuration: 3000,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      this.saleBar.setOption(option);
    },
    drawTest() {
      this.testBar = echarts.init(document.getElementById("testbar"));
      const option = {
        title: { text: "动态柱状图" },
        tooltip: {},
        yAxis: {
          inverse: true,
          data: ["RTX3060", "RTX3070", "RTX3080", "RTX3090"],
          animationDuration: 3000,
          animationDurationUpdate: 3000,
        },
        xAxis: {
          max: "dataMax",
        },
        series: [
          {
            realtimeSort: true,
            data: [0, 0, 0, 0],
            type: "bar",
          },
        ],
        animationDuration: 3000,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      this.timer = setInterval(() => {
        let data = option.series[0].data;
        let maxData = this.maxData;
        for (let i = 0; i < data.length; i++) {
          if (data[i] < maxData[i]) {
            data[i] += Math.round(Math.random() * 200);
          } else {
            data[i] = maxData[i];
          }
        }
        this.testBar.setOption(option);
      }, 3000);
    },
    getSaleData() {
      this.axios({
        method: "get",
        url:
          "http://121.40.159.226:7300/mock/617157de5e1e7941050f5e32/admin/saleData",
      }).then((res) => {
        this.saleData = res.data.data;
        this.$nextTick(() => {
          this.drawBar(this.saleData);
          this.drawTest();
        });
      });
    },
  },
  mounted() {
    this.getSaleData();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style></style>
