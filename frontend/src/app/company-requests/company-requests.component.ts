import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-company-requests',
  templateUrl: './company-requests.component.html',
  styleUrls: ['./company-requests.component.scss']
})
export class CompanyRequestsComponent implements OnInit {

  reqs:{"companyName":String, "title":String, "result":String, "comment":String}[];

  constructor(private service:UsersService) { }

  ngOnInit() {
    this.service.readAllRequests().subscribe((r:{"companyName":String, "title":String, "result":String, "comment":String}[])=>{
      this.reqs = r;
    })
  }

  save(){
    for(let i=0; i < this.reqs.length; i++){
      this.service.updateRequests(this.reqs[i].companyName, this.reqs[i].title,this.reqs[i].result,this.reqs[i].comment).subscribe(()=>{
        this.ngOnInit();
      })
    }
  }

}
