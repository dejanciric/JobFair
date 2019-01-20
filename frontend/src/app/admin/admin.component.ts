import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Package } from '../package.model';
import { Additional } from '../additional.model';
import { Prilog2 } from '../prilog2.model';
import {plainToClass} from "class-transformer";
import { Jobfair } from '../jobfair.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  packages:Package[]=[];
  additionals:Additional[]=[];
  prilog:Prilog2;

  image:String="";
  canEdit=false;
  constructor(private router:Router, private service:UsersService) { }

  ngOnInit() {
    if (sessionStorage.length > 0){
      if(sessionStorage.getItem("type")!="admin"){
        this.router.navigate(['/login']);
      }else{
        this.service.loggedUsername= sessionStorage.getItem("username");
        this.service.user = true;
        this.service.loggedImage = sessionStorage.getItem("image");
      }
    }else{
      this.router.navigate(['/login']);
    }
    this.image = this.service.getImage();

    this.flag = false;
    this.service.getJobfair().subscribe((j:Jobfair)=>{
      if (j){
        this.service.readPackage().subscribe((p:Prilog2[])=>{
          if (p){
            this.packages = p[0].packages;
            this.additionals= p[0].additionals;
          }
        })
        if (this.beforeJobfair(j.StartDate)){
          this.canEdit = true;
        }else{
          this.canEdit = false;
        }
      }else{

      }
    })


    //this.packages.push({"title":"title1", "contents":["content1", "content2", "content3"], "VideoPromotion":19,"Price":10000,"NoWorkchops":2,"NoPresentation":2,"NoLessons":1,"MaxCompanies":1});
    //this.additionals.push({"title":"additional1", "price":1000},{"title":"additional2", "price":2000},{"title":"additional3", "price":3000});
  
  }

  beforeJobfair(startTime){
    let currDate = new Date();
  
      let st:string[] = startTime.split("/");
      let start = new Date(+st[2],+st[1]-1, +st[0]);
  
      if (currDate < start)
        return true;
      else
      return false;
    

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
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
