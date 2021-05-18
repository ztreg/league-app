import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle
} from 'ng-apexcharts'

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill?: ApexFill
  colors?: any[]
  tooltip?: ApexTooltip
  title?: ApexTitleSubtitle
}

export type colors = {
  colors: string[]
}

export type teamChartObject = {
  data: number[]
  names: string[]
}
