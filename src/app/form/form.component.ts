import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  currentYear;
  currentMonth;
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  fromMonths = [];
  fromYears = [];
  toMonths = [];
  toYears = [];

  constructor(private fb: FormBuilder) { 

  }

  from = {
    year: '',
    month: ''
  }

  to = {
    year: '',
    month: ''
  }

  getFromMonths() {
    this.from.month = '';
    if(this.from.year === this.currentYear.toString()) {
      this.fromMonths = [];
      this.fromMonths = this.fromMonths.concat(this.months);
      this.fromMonths.splice(0, this.currentMonth);
    } else if(this.from.year > this.currentYear) {
      this.fromMonths = this.months
    } else {
      this.fromMonths = [];
    }
  }

  getToYears(){
    this.to.year = '';
    this.toYears = [];
    this.toYears = this.toYears.concat(this.fromYears);
    this.toYears.splice(0, this.fromYears.indexOf(parseInt(this.from.year)))
  }

  getToMonths(){
    this.to.month = '';
    if(this.to.year === this.from.year) {
      this.toMonths = [];
      this.toMonths = this.toMonths.concat(this.months);
      this.toMonths.splice(0, this.months.indexOf(this.from.month));
    } else if(this.to.year > this.from.year) {
      this.toMonths = this.months;
    } else {
      this.toMonths = [];
    }
  }

  records = []

  generateRecords(){
    let tempMonth = this.from.month;
    let tempYear = parseInt(this.from.year);
    this.records = [];
    let diff = moment(`${this.months.indexOf(this.to.month)+1}/${parseInt(this.to.year)}`, 'M/YYYY').diff(moment(`${this.months.indexOf(this.from.month)+1}/${parseInt(this.from.year)}`, 'M/YYYY'), 'months', true);
    let numberOfMonths = diff + 1;
    for(let i = 0; i < numberOfMonths; i++) {
      this.records.push({
        date: `${tempMonth} ${tempYear}`,
        value1: '',
        value2: '',
        value3: ''
      });
      tempMonth = this.months[this.months.indexOf(tempMonth)+1];
      if(!tempMonth){
        tempMonth = this.months[0];
        tempYear = tempYear + 1;
      }
    }
  }

  finalOutput() {
    console.log(this.records);
  }

  form = new FormGroup({
    fromYear: new FormControl(),
    fromMonth: new FormControl(),
    toYear: new FormControl(),
    toMonth: new FormControl()
  })

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    for(let i = 0; i < 10; i++) {
      this.fromYears.push(this.currentYear + i)
    }
  }

}
