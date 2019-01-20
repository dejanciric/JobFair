import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

  selectedCompany:String="";
  reqs:{"companyName":String, "title":String, "result":String, "comment":String}[]=[];
  slots:String[]=[];
  companySlots:{"val":String}[]=[];
  flag = false;

  companySlotsDB:{"companyName":String, "slot":String[]}[]=[];
  slotsDB:{"companyName":String, "slot":String[]}[]=[];

  image:String="";

  constructor(private service:UsersService, private router:Router) { }

  ngOnInit() {
    if (sessionStorage.length > 0){
      if(sessionStorage.getItem("type")!="admin"){
        this.router.navigate(['/login']);
      }else{
        this.service.loggedUsername= sessionStorage.getItem("username");
        this.service.user = true;
        this.service.loggedImage = sessionStorage.getItem("image");
      }
    }else{
      this.router.navigate(['/login']);
    }
    this.image = this.service.getImage();
    this.flag=false;
    this.service.readAcceptedRequests().subscribe((cr:{"companyName":String, "title":String, "result":String, "comment":String}[])=>{
      this.reqs = cr;
    })

    this.service.readAllSlots().subscribe((s:{"companyName":String, "slot":String[]})=>{
      this.slots = s.slot;
    })


  }

  test(companyName){
    this.companySlots= [];  
    if(this.selectedCompany == companyName){
      this.flag=false;
      this.selectedCompany = "";
      return;
    }
    this.flag=true;
  this.selectedCompany =companyName;
  this.service.readCompanySlots(companyName).subscribe((s:{"companyName":String, "slot":String[]})=>{
    for (let i = 0; i < s.slot.length; i++)
      this.companySlots.push({"val":s.slot[i]});

  })
  }

  save(){
    let slots:String[] = [];
    for (let i = 0; i < this.companySlots.length; i++)
    slots.push(this.companySlots[i].val)

    this.service.updateSlot(this.selectedCompany, slots).subscribe(()=>{
      this.flag= false;
      this.selectedCompany = "";
    })

  }

  add(){
    this.companySlots.push({"val":""});
  }

  func(companyName){
    this.router.navigate(['/companyDetails']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
