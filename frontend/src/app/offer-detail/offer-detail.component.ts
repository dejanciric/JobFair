import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { Offer } from '../offer.model';
import { User } from '../user.model';

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

  constructor(private service:CompanyService, private router:Router) { }

  ngOnInit() {
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

}
