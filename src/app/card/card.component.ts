import { Component, OnInit } from '@angular/core';
import { CovidserviceService } from '../covidservice.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private covid : CovidserviceService) { }

  ngOnInit(): void {
      this.covid.getdata().subscribe((data)=>{
        console.log(data)
        var data = data.data;
        console.log(data)
        
        this.types[0].value=data.local_total_cases;
        this.types[1].value=data.local_active_cases;
        this.types[2].value=data.local_deaths;
        this.types[3].value=data.local_recovered;
        
      })
    }
    types=[
      {case:"total_cases",value:"1"},
      {case:"active_cases"},
      {case:"local_deaths"},
      {case:"local_recovered"}
      
    ];
  
  }

