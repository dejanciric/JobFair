import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { Offer } from '../offer.model';

@Component({
  selector: 'app-student-offers',
  templateUrl: './student-offers.component.html',
  styleUrls: ['./student-offers.component.scss']
})
export class StudentOffersComponent implements OnInit {

  image:String="";
  title:String="";
  type:String[]=null;

  offers:Offer[];

  constructor(private service: UsersService, private companyService: CompanyService, private router:Router) { }

  ngOnInit() {
    this.image = this.service.getImage();

    this.search();
  }

  test(id){
    this.companyService.selectedOfferId = id;
    this.router.navigate(['/offerDetails']);
  }

  search(){
    this.service.searchOffer(this.title, this.type).subscribe((offers:Offer[])=>{
      this.offers = offers;
    })
  }


}
