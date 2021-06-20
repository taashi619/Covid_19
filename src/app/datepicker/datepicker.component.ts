import { Component, OnInit ,Input, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CovidserviceService } from '../covidservice.service';
import { Chart1Component } from '../chart1/chart1.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @ViewChild (Chart1Component) line:Chart1Component;
  value1=null
  minDate:Date;
  maxDate:Date;
  pcr_data:any;
  Index:number;
  selectedDate1:Date;
  selectedDate2:Date;
  c_date1:any;
  c_date2:any;
  minIndex:number;
  maxIndex:number;

  constructor(private covid : CovidserviceService) { 
  let currentYear = new Date().getFullYear(); // Set the minimum to start date and maximum to current date.
  let month = new Date().getMonth();
  let day = new Date().getDate();
  this.minDate = new Date(2020,2,18);
  this.maxDate = new Date(currentYear,month,day);
  }

  addEvent1(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate1 = event.value; //get start date
    this.c_date1=this.changeDate(this.selectedDate1); //change as needed
    for (let i = 0; i < this.Index; i++) {
      if(this.pcr_data[i].date.match(this.c_date1)){
        this.minIndex = i;
        //console.log(this.pcr_data[i-1].date); 
        break;
      }  
    }
  }

  addEvent2(event: MatDatepickerInputEvent<Date>) {
    
    this.selectedDate2 = event.value;
    this.c_date2=this.changeDate(this.selectedDate2);
    for (let i = 0; i < this.Index ; i++) {
      if(this.pcr_data[i].date.match(this.c_date2)){
        this.maxIndex = i;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.covid.getdata().subscribe((res)=>{
      this.pcr_data = res.data.daily_pcr_testing_data;
      this.Index = this.pcr_data.length;
      //console.log(this.Index);
    })
  }
  
  changeDate(date:Date){
    var month_number:any = date.getMonth() + 1;
    var date_date:any = date.getDate();
    //console.log(date_date);
    if(date_date < 10 || month_number < 10){
      if(month_number < 10){
        month_number = '0' + month_number;
      }
      if(date.getDate() < 10){
        date_date = '0' + date_date;
      }
      return date.getFullYear() + '-' + month_number + '-' + date_date;
    }
    return date.getFullYear() + '-' + month_number + '-' + date_date;
  }
  onselect1(){
    //console.log("Check");
    this.line.enter();
  }
  onselect2(){
    this.selectedDate1 = null;
    this.selectedDate2 = null;
    this.line.reset();

  }

}
