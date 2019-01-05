import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { Offer } from '../offer.model';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  title:String = "";
  type:String ="";
  deadline:String = "";
  content:String = "";
  companyUsername:String = "";

  companyName:String = "";
  city:String = "";
  image:String="";

  constructor(private service:CompanyService, private router:Router, private userService:UsersService) { }

  ngOnInit() {
    this.image=this.userService.getImage();
    this.userService.findCompanyByName(this.companyName).subscribe((user:User)=>{
      this.service.companyUsernameForDetails = user.username;
      this.service.companyName = this.companyName;
      this.service.companyImage = user.image;
      this.router.navigate(['/companyDetails']);
      
    })
    this.service.findOfferById(this.service.selectedOfferId).subscribe((offer:Offer)=>{
      this.title = offer.title;
      this.type = offer.type;
      this.deadline = offer.deadline;
      this.content = offer.content;
      this.companyUsername = offer.companyUsername;
      this.service.findByUsername(this.companyUsername).subscribe((user:User)=>{
        this.companyName = user.companyName;
        this.city = user.city;
      })
    })


  }

  apply(){
    this.router.navigate(['/apply']);
  }



}
