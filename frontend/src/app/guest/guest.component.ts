import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

  companyName:String="";
  work:String[]=null;
  city:String="";
  image:String="";

  companies:User[]=null;

  constructor(private service: CompanyService, private router:Router, private userService:UsersService) { }

  ngOnInit() {

    this.image=this.userService.getImage();
    this.search();
  }

  test(username, companyName, image){
    this.service.companyUsernameForDetails = username;
    this.service.companyName = companyName;
    this.service.companyImage = image;
    this.router.navigate(['/companyDetails']);
  }

  search(){
    this.service.searchCompany(this.companyName, this.city, this.work).subscribe((companies:User[])=>{
      this.companies = companies;
    })
  }

}
