import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.component.html',
  styleUrls: ['./store-orders.component.css']
})
export class StoreOrdersComponent implements OnInit {
  
  @ViewChild('dayPicker') datePicker: DatePickerComponent;
  open() { this.datePicker.api.open(); }
  close() { this.datePicker.api.close(); }
  selectedDate;
  constructor() { }

  ngOnInit(): void {
  }

}
