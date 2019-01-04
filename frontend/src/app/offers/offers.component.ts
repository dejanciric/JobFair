import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Offer } from '../offer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers:Offer[];
  companyName:String="";

  constructor(private service: CompanyService, private router:Router) { }

  ngOnInit() {
    this.companyName = this.service.companyName;
    this.service.findOfferByCompany(this.service.companyUsernameForDetails).subscribe((offers:Offer[])=>{
      this.offers = offers;
    })
  }

  test(id){
    this.service.selectedOfferId = id;
    this.router.navigate(['/offerDetails']);
  }

}
