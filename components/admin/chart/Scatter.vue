<template>
  <div class="scatter">
    <scatter-chart
      :chart-data="chartdata"
      :options="options"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartdata: {
        datasets: [{
          label: 'Scatter Dataset',
          data: [
            { x: 32, y: 33},
            { x: 4, y: 11},
            { x: 8, y: 16},
            { x: 7, y: 12}
          ],
          backgroundColor: "rgba(114, 124, 245, 0.7)",
          borderColor: "rgba(114, 124, 245, 1)",
          borderWidth: 2,
          pointRadius: 8
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          fontSize: 14,
          fontStyle: 'normal',
          padding: 20,
          text: 'LikesとBookmerksの相関関係'
        },
        legend: { display: false },
        scales: {
          xAxes: [{
            scaleLabel: { display: true, labelString: 'Likes' }
          }],
          yAxes: [{
            scaleLabel: { display: true, labelString: 'Bookmarks' },
            ticks: { min: 0 }
          }]
        }
      }
    }
  }
}
</script>
