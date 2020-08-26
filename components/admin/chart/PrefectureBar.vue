<template>
  <div class="prefcture-bar">
    <bar-chart
      :chart-data="chartdata"
      :options="options"
    />
  </div>
</template>

<script>
import prefecturesjson from '@/assets/json/prefecture.json';

export default {
  data() {
    return {
      prefectures: [],
      chartdata: {
        labels: [],
        datasets: [{
          backgroundColor: "rgba(114, 124, 245, 0.7)",
          borderColor: "rgba(114, 124, 245, 1)",
          borderWidth: 1,
          data: []
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          fontSize: 14,
          fontStyle: 'normal',
          padding: 20,
          text: '都道府県ごとのコート登録数'
        },
        legend: { display: false },
        scales: {
          xAxes: [{
            scaleLabel: { display: false, labelString: '' },
            gridLines: { display: false },
          }],
          yAxes: [{
            scaleLabel: { display: false, labelString: '' },
            ticks: { min: 0 }
          }]
        }
      }
    }
  },
  props: {
    courts: {
      type: Array,
      required: false,
      default: []
    }
  },
  created() {
    const preData = prefecturesjson.prefectures.map((v) => v.name);
    this.chartdata.labels = preData;

    const courtsArr = this.courts.map((v) => v.prefecture);
    const courtCountByPrefecture = this.chartdata.labels.map((pre) => {
      return courtsArr.filter((v) => v === pre).length;
    })
    this.chartdata.datasets[0].data = courtCountByPrefecture;
  }
}
</script>
