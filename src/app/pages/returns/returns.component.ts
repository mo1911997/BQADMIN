import { Component, OnInit } from '@angular/core';
import { ReturnsService } from '../services/returns.service';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})



export class ReturnsComponent implements OnInit {
  requests : any;
  statusDisabledList = [];
  mainList = [];
  statusList = [];
  qtyDisabledList = [];
  statusFinalList = [];
  widgetForm = new FormGroup({
    qty:new FormControl(''),
    status: new FormControl('')
  })
  constructor(private returnsService: ReturnsService,private fb:FormBuilder,private toastr:ToastrService,private loader:NgxUiLoaderService) { }
  returnsForm = new FormGroup({
    returns:this.fb.array([])
  })

  returns(): FormArray {
    return this.returnsForm.get("returns") as FormArray
  }

  newReturn(): FormGroup {
    return this.fb.group({
      internal:this.fb.array([])
    })
  }

  newInternal(): FormGroup {
    return this.fb.group({
      qty: '',
      status: '',
    })
  }

  internalArray(index): FormArray {
    return this.returns().at(index).get('internal') as FormArray;
  }

  ngOnInit(): void {
    this.getRequests();
  }
  counter = Array;
  noReturn(length)
  {
    return new Array(length);
  }
  getSelectedQty(event,i,o)
  {
    console.log(event.target.value);
    for(var ii of this.requests)
    {
      for(var jj of ii.items)
      {
        if(jj.id == i)
        {
          jj.approved_qty = event.target.value;
        }
      }
    }
  }
  getSelectedStatus(event,i,o)
  {
    console.log(event.target.value);
    for(var ii of this.requests)
    {
      for(var jj of ii.items)
      {
        if(jj.id == i)
        {
          var obj;
          if(event.target.value == "Approved")
          {
            obj = {
              Pending :1,
              Approved: 1,
              Rejected: 0
            }
          }
          else
          {
            obj = {
              Pending :1,
              Approved: 0,
              Rejected: 1
            }
          }
          jj.status = JSON.stringify(obj);
        }
      }
    }
    console.log(this.requests);
  }
  update(id)
  {
    this.loader.start();
    console.log("ORDERID"+this.requests[id].order_id);
    this.returnsService.updateReturnRequest(this.requests[id]._id,this.requests[id].items,this.requests[id].order_id).subscribe(
      data => {
        this.loader.stop();
        console.log(data);
        if(data['state'] == 'success')
        {
          this.getRequests();
          this.toastr.success('Updated !');
        }
        else
        {
          this.toastr.error('Server Error !');
        }
      }
    )
  }
  getRequests()
  {
    this.requests = [];
    this.statusDisabledList = [];
    this.qtyDisabledList = [];
    this.mainList = [];
    this.statusFinalList = [];
    this.statusList = [];
    this.returnsService.getRequests().subscribe(
      data => {
        console.log(data);
        if(data['state'] === 'success')
        {
          this.requests = data['data'];
          for(var i = 0;i<this.requests.length;i++)
          {
            this.statusDisabledList = [];
            this.statusList = [];
            for(var j=0;j<this.requests[i].items.length;j++)
            {
              console.log(JSON.parse(this.requests[i].items[j].status));
              if(JSON.parse(this.requests[i].items[j].status)['Approved'] === 1 || JSON.parse(this.requests[i].items[j].status)['Rejected'] === 1)
              {
                this.statusDisabledList.push(false);
                console.log('inhere');
              }
              else
              {
                this.statusDisabledList.push(true);
                console.log('inhere2');
              }
              if(JSON.parse(this.requests[i].items[j].status)['Approved'] === 1)
              {
                this.statusList.push(true);
              }
              else
              {
                this.statusList.push(false);
              }
            }
            this.statusFinalList.push(this.statusList);
            this.mainList.push(this.statusDisabledList);
          }
        }
        else
        {

        }
      }
    )

  }
}
