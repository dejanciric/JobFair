import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { User } from '../user.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  username:String="";
  firstname:String="";
  lastname:String="";
  companyName:String="";
  city:String="";
  address:String="";
  PIB:String="";
  employeeNumber:String="";
  webSite:String="";
  work:String="";
  mail:String="";
  special:String="";

  constructor(private service:CompanyService) { }

  ngOnInit() {
    this.username = this.service.companyUsernameForDetails;
    this.service.findByUsername(this.username).subscribe((user:User)=>{
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.companyName = user.companyName;
      this.city = user.city;
      this.address = user.address;
      this.PIB = user.PIB;
      this.employeeNumber = user.employeeNumber;
      this.webSite = user.webSite;
      this.work = user.work;
      this.mail = user.mail;
      this.special = user.special;
    })
  }

}
