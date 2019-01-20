import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { CV } from '../cv.model';
import { CompanyComponent } from '../company/company.component';
import { CompanyService } from '../company.service';
import { Offer } from '../offer.model';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  username:String="";
  firstname:String="";
  lastname:String="";
  phone:String="";
  phoneType:String="";
  mail:String="";
  image:String ="";
  cover:String="";

  constructor(private service:UsersService, private router: Router, private companyService: CompanyService) { }

  ngOnInit() {
    if (sessionStorage.length > 0){
      if(sessionStorage.getItem("type")!="student"){
        this.router.navigate(['/login']);
      }else{
        this.service.loggedUsername= sessionStorage.getItem("username");
        this.service.user = true;
        this.service.loggedImage = sessionStorage.getItem("image");
        this.companyService.selectedOfferId = sessionStorage.getItem("offerid");
      }
    }else{
      this.router.navigate(['/login']);
    }
    this.image=this.service.getImage();
  }

  load(){
    this.service.readCV().subscribe((cv:CV)=>{
      this.username = cv.username;
      this.firstname=cv.firstname;
      this.lastname = cv.lastname;
      this.phone = cv.phone;
      this.phoneType = cv.phoneType;
      this.mail = cv.mail;
    })
  }

  apply(){
    this.companyService.findOfferById(this.companyService.selectedOfferId).subscribe((offer:Offer)=>{
      let students = offer.students;
      students.push({"username":this.username, "firstname":this.firstname, "lastname":this.lastname, "result":"TBA", "comment":""});
      this.service.applyToOffer(this.companyService.selectedOfferId, students).subscribe(()=>{
        this.router.navigate(['/student']);
      })
    });
    
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
