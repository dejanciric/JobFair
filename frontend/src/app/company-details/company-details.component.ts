import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';

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
  image:String ="";

  imageuser:String="";

  updatePath = "http://localhost:4000/uploads/";
  constructor(private service:CompanyService, private userService:UsersService) { }

  ngOnInit() {
    this.imageuser=this.userService.getImage();
  
    this.companyName = this.service.companyName;
    this.userService.findCompanyByName(this.companyName).subscribe((user:User)=>{
      this.username = user.username;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.service.companyUsernameForDetails= user.username;
      this.city = user.city;
      this.address = user.address;
      this.PIB = user.PIB;
      this.employeeNumber = user.employeeNumber;
      this.webSite = user.webSite;
      this.work = user.work;
      this.mail = user.mail;
      this.special = user.special;
      this.image = this.updatePath+user.image;
     this.service.companyImage = user.image;
    })
  }

}
