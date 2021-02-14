import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  p:any;
  filter:any;
  searchForm = new FormGroup({
    searchbox : new FormControl('')
  })
  constructor() { }

  ngOnInit(): void {
  }

}
