import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { ChartOptions, teamChartObject } from 'src/app/types/Chart'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() teamStats: any
  @ViewChild('chart') chart: ChartComponent | undefined
  public chartOptions: Partial<ChartOptions> | undefined
  constructor() {}
  avaialbleStats = [
    {
      statName: 'totalDamageDealtToChampions',
      displayName: 'DMG-to-champs'
    },
    {
      statName: 'totalHeal',
      displayName: 'Heal-to-champs'
    },
    {
      statName: 'totalDamageTaken',
      displayName: 'DMG-from-champs'
    },
  ]
  chosenStats = this.avaialbleStats[0].statName

  ngOnInit(): void {
    this.fillGraph()
  }
  changeGraphStat($event: any): void {
    const displayName = $event.tab.textLabel
    const pos = this.avaialbleStats.findIndex(element => element.displayName === displayName)
    this.chosenStats = this.avaialbleStats[pos].statName
    this.fillGraph()
  }
  fillGraph(): void {

    const teamObject: teamChartObject = {
      names: [],
      data: []
    }
    for (let i = 0; i < this.teamStats.length; i++) {
      const player = this.teamStats[i]
      teamObject.names[i] = player.name
      teamObject.data[i] = player.stats[this.chosenStats]
    }
    console.log(this.teamStats)


    this.chartOptions = {
      tooltip: {
        enabled: false,
      },
      title: {
        text: this.chosenStats
      },
      fill: {
        colors: ['#e60000']
      },
      series: [
        {
          name: 'basic',
          data: teamObject.data
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#F0FFFF'
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: teamObject.names
      },
    }
  }


}
