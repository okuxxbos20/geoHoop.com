import Vue from 'vue';
import { Scatter, Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

Vue.component('scatter-chart', {
  extends: Scatter,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});

Vue.component('bar-chart', {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});
