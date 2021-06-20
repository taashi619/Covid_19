import { Component, OnInit,Input } from '@angular/core';
import { CovidserviceService } from '../covidservice.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  data:any;
  date:any[];
  count:any[];
  myline:any;

  @Input() min:number;
  @Input() max:number;
  
  constructor(private covid : CovidserviceService) { }

    enter():void{
      this.covid.getdata().subscribe((res)=>{
     // console.log("min ->",this.min);
      //console.log("max ->",this.max);
      this.count=[];
      this.date=[];
      for(var i=this.min;i<=this.max;i++){
        this.count.push( this.data.data.daily_pcr_testing_data[i].count);
        this.date.push(this.data.data.daily_pcr_testing_data[i].date);
      }
      this.myline = new Chart("myline", {
        type: 'line',
        data: {
            labels: this.date,
            datasets: [{
              label: 'Number of PCR',
              data:this.count,
              fill:false,
              lineTension:0.2,
              borderColor:"red",
              borderWidth: 1,
              pointStyle:'circle',
              pointRadius:0
            }]
          
        },
        options: {
          scales: {
              yAxes: [{
                display: true
              }],
              xAxes:[{
                display: true
              }],
          }
        }
      })
    })
    }
  
  reset(){
    
    this.ngOnInit() ;
    
  }
  ngOnInit():void{
    this.covid.getdata().subscribe((res)=>{
      this.data=res;
      //var data =res.data['daily_pcr_testing_data'];
      this.count=res.data['daily_pcr_testing_data'].map((r:{count:any})=>r.count);
      this.date=res.data['daily_pcr_testing_data'].map((r:{date:any})=>r.date);
      //console.log("date=>",this.count);
    
      this.myline = new Chart("myline", {
        type: 'line',
        data: {
            labels: this.date,
            datasets: [{
              label: 'Number of PCR',
              data:this.count,
              fill:false,
              lineTension:0.2,
              borderColor:"red",
              borderWidth: 1,
              pointStyle:'circle',
              pointRadius:0
            }]
          
        },
        options: {
          scales: {
              yAxes: [{
                display: true
              }],
              xAxes: [{
                display: true
              }],
          }
        }
      })
    })
  }

}
