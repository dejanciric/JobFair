import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { User } from '../user.model';
import { Offer } from '../offer.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  title:String="";
  type:String="Full time";
  deadline:String="";
  content:String="";

  companyName:String="";
  companyUsername:String="";

  image:String="";

  id:String="";
  file:File;
  success=false;

  constructor(private service:UsersService, private router:Router, private companyService:CompanyService) { }

  ngOnInit() {
    this.image=this.service.getImage();
    this.companyUsername = this.service.loggedUsername;

    this.service.findByUsername(this.companyUsername).subscribe((user:User)=>{
      this.companyName = user.companyName;
      this.companyService.companyName = this.companyName;
    })
  }

  publish(){
    
    this.service.findAllOffers().subscribe((offers:Offer[])=>{
      if (offers){
        this.id = offers[offers.length-1].id;
      }
      let tmp = +this.id;
      tmp++;
      this.id=tmp+"";

      this.service.publishOffer(this.id, this.title, this.type, this.deadline, this.content, this.companyName,this.companyUsername, "").subscribe(()=>{
        this.service.uploadFileOffer(this.file).subscribe(()=>{
          this.success= true;
          this.title="";
          this.type="Full time";
          this.deadline="";
          this.content="";
          this.file=null;
        });
      })
    })
  }

  onFileSelected(event){
    this.file = event.target.files[0];
    //this.service.uploadFile(selectedFile);
  }

}
