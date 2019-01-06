import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Package } from '../package.model';
import { Additional } from '../additional.model';
import { Prilog2 } from '../prilog2.model';
import {plainToClass} from "class-transformer";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  packages:Package[]=[];
  additionals:Additional[]=[];
  prilog:Prilog2;

  constructor(private router:Router, private service:UsersService) { }

  ngOnInit() {
    this.flag = false;
    this.service.readPackage().subscribe((p:Prilog2[])=>{
      if (p){
        this.packages = p[0].packages;
        this.additionals= p[0].additionals;
      }
    })
    //this.packages.push({"title":"title1", "contents":["content1", "content2", "content3"], "VideoPromotion":19,"Price":10000,"NoWorkchops":2,"NoPresentation":2,"NoLessons":1,"MaxCompanies":1});
    //this.additionals.push({"title":"additional1", "price":1000},{"title":"additional2", "price":2000},{"title":"additional3", "price":3000});
  
  }
  url;
  add(){
    this.packages.push({"Title":"", "Content":[""], "VideoPromotion":0,"Price":0,"NoWorkchops":0,"NoPresentation":0,"NoLessons":0,"MaxCompanies":0})
  }

  addContent(packagee:Package){
    packagee.Content.push("");
  }

  addAdditional(){
    this.additionals.push({"Title":"", "Price":0});
  }

  onFileSelected(event){
    //procitati fajl isparsirati i popuniti nizove
    /*console.log(event);
    let file:File = event.taget.files[0];
    this.appSettingsService.getJSON().subscribe(data => {
      console.log(data)
  });*/
 
  var reader = new FileReader();

  reader.onload = (event: ProgressEvent) => {
      this.url = (<FileReader>event.target).result;

      this.service.getJSON(this.url).subscribe((data) => {
        //let prilog = plainToClass(Prilog2, data);
        
        this.additionals = data.Additional;
        this.packages = data.Packages;
    });

  }

  reader.readAsDataURL(event.target.files[0]);

  }
  flag =false;

  save(){
    this.service.deletePackages().subscribe(()=>{
      this.service.savePackages(this.packages, this.additionals).subscribe(()=>{
        this.flag = true;
      })
    })

  }

}
