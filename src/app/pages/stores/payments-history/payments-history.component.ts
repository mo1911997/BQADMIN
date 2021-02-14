import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history.component.html',
  styleUrls: ['./payments-history.component.css']
})
export class PaymentsHistoryComponent implements OnInit {
  history;
  amount = 0;
  id;
  constructor(private storesService:StoresService,private loader:NgxUiLoaderService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getPaymentsHistory();
    this.id = window.history.state.id;
    this.amount = window.history.state.hello;
  }
  clearPayment()
  {
    this.loader.start();
    this.storesService.clear_payment(this.id,this.amount).subscribe(
      data => {
        this.loader.stop();
        if(data['state'] == "success")
        {

        }
        else
        {

        }
      }
    )
  }
  getPaymentsHistory()
  {
    this.storesService.getPaymentsHistory().subscribe(
      data => {
        console.log(data);
        if(data['state'] == 'success')
        {
          this.history = data['data'];
        }
        else
        {

        }
      }
    )
  }
}
