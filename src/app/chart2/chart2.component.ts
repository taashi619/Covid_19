import { Component, OnInit } from '@angular/core';
import { CovidserviceService } from '../covidservice.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {

  constructor(private covid : CovidserviceService) { }

  ngOnInit(): void {
    this.covid.getdata().subscribe((res)=>{
      var data =res.data;
      console.log(res);
      
      myChart.data.datasets[0] .data[0] = data.local_total_cases;
      myChart.data.datasets[0].data[1] = data.local_active_cases;
      myChart.data.datasets[0].data[2] = data.local_deaths;
      myChart.data.datasets[0].data[3] = data.local_recovered;
      myChart.update();

    });
      
    var myChart = new Chart("myChart", {
        type: 'doughnut',
        data: {
            labels: ['Confirmed Cases', 'Active Cases', 'Deaths', 'Recovered Cases'],
            datasets: [{
              //  label: '# of Votes',
                //data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                
            }]
           
        }
    })
  }

}
