import { Component } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'chart.js';

// Register everything from Chart.js
import { registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  imports: [MatButtonModule, MatCardModule, BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics {

  //Chart 1
    chartData1: ChartData<'bar'> = {
      labels: ['Laptop', 'Desktop', 'TV', 'Printer'],
      datasets: [
        { label: 'Equipments', data: [65, 59, 80, 81], backgroundColor: ['#20784f','#1b6442','#3ca075','#79d6ae'] },
      ],
    };

    chartOptions1: ChartOptions = {
      responsive: true,
    };

    //Chart 2
    chartData2: ChartData<'doughnut'> = {
      labels: ['Functional', 'Non-Functional', 'For Condemn'],
      datasets: [
        { label: 'Status', data: [120, 150, 90], backgroundColor: ['#1b6442','#3ca075','#79d6ae'] },
        
      ],
    };

    chartOptions2: ChartOptions = {
      responsive: true,
    };

}
