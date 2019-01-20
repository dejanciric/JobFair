import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Offer } from '../offer.model';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers:Offer[];
  companyName:String="";
  updatePath = "http://localhost:4000/uploads/";
  image:String="";
  imageuser:String="";

  constructor(private service: CompanyService, private router:Router, private userService: UsersService) { }

  ngOnInit() {
    if (sessionStorage.length > 0){

        this.userService.loggedUsername= sessionStorage.getItem("username");
        this.userService.user = true;
        this.userService.loggedImage = sessionStorage.getItem("image");
      
    }
    this.imageuser=this.userService.getImage();
    this.companyName = this.service.companyName;
    this.image = this.updatePath+this.service.companyImage;
    this.service.findOfferByCompany(this.service.companyUsernameForDetails).subscribe((offers:Offer[])=>{
      this.offers = offers;
    })
  }

  test(id){
    if (this.userService.user){
      this.service.selectedOfferId = id;
      sessionStorage.setItem("offerid", id);
      this.router.navigate(['/offerDetails']);
    }

  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
