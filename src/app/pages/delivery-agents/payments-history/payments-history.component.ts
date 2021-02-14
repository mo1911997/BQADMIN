import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryAgentsService } from '../../services/delivery-agents.service';
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
  constructor(private loader:NgxUiLoaderService,private toastr:ToastrService,private http:HttpClient,private deliveryAgentsService:DeliveryAgentsService) { }

  ngOnInit(): void {
    this.getCashInHandHistory();
    this.id = window.history.state.id;
    this.amount = window.history.state.amount;
  }
  clearPayment()
  {
    this.loader.start();
    this.deliveryAgentsService.clear_payment(this.id,this.amount).subscribe(
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
  getCashInHandHistory()
  {
    this.deliveryAgentsService.getCashInHandHistory().subscribe(
      data => {
        console.log(data);
        if(data['state'] == 'success')
        {
          this.history = data['data'];
        }
      }
    )
  }

}
