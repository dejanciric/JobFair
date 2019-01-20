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

  currDate:String="";
  imageOffer:String="";

  constructor(private service:CompanyService, private router:Router, private userService:UsersService) { }

  ngOnInit() {
    if (sessionStorage.length > 0){

        this.userService.loggedUsername= sessionStorage.getItem("username");
        this.userService.user = true;
        this.userService.loggedImage = sessionStorage.getItem("image");
        this.service.selectedOfferId = sessionStorage.getItem("offerid");
      
    }
    
    this.image=this.userService.getImage();
    this.currDate=this.getCurrDate();

    this.service.findOfferById(this.service.selectedOfferId).subscribe((offer:Offer)=>{
      this.title = offer.title;
      this.type = offer.type;
      this.deadline = offer.deadline;
      this.content = offer.content;
      this.companyUsername = offer.companyUsername;
      this.imageOffer = "http://localhost:4000/uploads/"+offer.image;
      this.service.findByUsername(this.companyUsername).subscribe((user:User)=>{
        this.companyName = user.companyName;
        this.city = user.city;
        this.userService.findCompanyByName(this.companyName).subscribe((user:User)=>{
          this.service.companyUsernameForDetails = user.username;
          this.service.companyName = user.companyName;
          this.service.companyImage = user.image;
          //this.router.navigate(['/companyDetails']);
          
        })
      })
    })


  }

  apply(){
    this.router.navigate(['/apply']);
  }

  getCurrDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var ddd:string = dd+"";
    var mmm:string = mm+"";
    if(dd<10) {
        ddd = '0'+dd
    } 

    if(mm<10) {
       mmm = '0'+mm
    } 

    return  ddd + '/' + mmm  + '/' + yyyy;
  }

  expired(){
    let f:string[] = this.deadline.split("/");
    let s:string[] = this.currDate.split("/");
    
    let firstDate = new Date(+f[2],+f[1]-1, +f[0]);
    let secondDate = new Date(+s[2],+s[1]-1, +s[0]);
    
    if (firstDate < secondDate){
      return true;
    }
    return false;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
