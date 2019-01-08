import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-company-requests',
  templateUrl: './company-requests.component.html',
  styleUrls: ['./company-requests.component.scss']
})
export class CompanyRequestsComponent implements OnInit {

  reqs:{"companyName":String, "title":String, "result":String, "comment":String}[]=[];
  image:String="";
  slectedCompany:String="";
  companies:String[]=[];

  schedule:String[]=[];
  
  constructor(private service:UsersService) { }

  ngOnInit() {
    this.flag = false;
    this.image = this.service.getImage();
    this.companies = [];

    this.service.readAllRequests().subscribe((r:{"companyName":String, "title":String, "result":String, "comment":String}[])=>{
      if (r.length > 0){
        this.reqs = r;
      }else{
        this.reqs=[];
        this.service.readSchedule().subscribe((sch:{"companies":String[]})=>{
          this.schedule = sch.companies;
          //console.log(this.schedule);
          this.showSchedule();
        })
       this.service.readAcceptedRequests().subscribe((cr:{"companyName":String, "title":String, "result":String, "comment":String}[])=>{
         for(let i = 0; i<cr.length; i++)
          this.companies.push(cr[i].companyName);
       })
        
      }
    })


  }

  showSchedule(){
    for (let i = 0; i < this.schedule.length; i++){
      document.getElementById((i+1)+"").innerHTML=<string>this.schedule[i];
    }
  }

  save(){
    for(let i=0; i < this.reqs.length; i++){
      this.service.updateRequests(this.reqs[i].companyName, this.reqs[i].title,this.reqs[i].result,this.reqs[i].comment).subscribe(()=>{
        this.ngOnInit();
      })
    }
  }

  btnClick(id){
    document.getElementById(id).innerHTML=<string>this.slectedCompany;
    this.schedule[+(id-1)]=<string>this.slectedCompany;
  }
  flag = false;

  saveSchedule(){
    this.service.saveSchedule(this.schedule).subscribe(()=>{
      this.flag= true;
    })
  }

  clear(){
    for (let i = 0; i < this.schedule.length; i++){
      document.getElementById((i+1)+"").innerHTML="";
      this.schedule[i] = "";
    }
  }

}
