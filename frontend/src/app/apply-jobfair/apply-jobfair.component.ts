import { Component, OnInit } from '@angular/core';
import { Package } from '../package.model';
import { Additional } from '../additional.model';
import { UsersService } from '../users.service';
import { Prilog2 } from '../prilog2.model';
import { CompanyService } from '../company.service';
import { Period } from '../periods.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-jobfair',
  templateUrl: './apply-jobfair.component.html',
  styleUrls: ['./apply-jobfair.component.scss']
})
export class ApplyJobfairComponent implements OnInit {
  packages:Package[]=[];
  additionals:Additional[]=[];
  currPackage:Package;
  additionalsChecked:Boolean[]=[];
  flag = false;

  radios=[];

  title:String="";
  result:String="";
  comment:String="";
  alreadyApplied=false;
  image:String="";
  disable=false;
  constructor(private service:UsersService, private companyService:CompanyService, private router:Router) { }

  ngOnInit() {
    if (sessionStorage.length > 0){
      if(sessionStorage.getItem("type")!="company"){
        this.router.navigate(['/login']);
      }else{
        this.service.loggedUsername= sessionStorage.getItem("username");
        this.service.user = true;
        this.service.loggedImage = sessionStorage.getItem("image");
      }
    }else{
      this.router.navigate(['/login']);
    }
      this.flag = false;
      this.image = this.service.getImage();
      let currDate = new Date();
      this.service.readPeriods().subscribe((p:Period)=>{
        let f:string[] = p.companiesFrom.split("/");
        let from = new Date(+f[2],+f[1]-1, +f[0]);
    
        let t:string[] = p.companiesTo.split("/");
        let to = new Date(+t[2],+t[1]-1, +t[0]);
    
        if (currDate >= from && currDate <=  to)
        this.disable = false;
        else
        this.disable = true;
      })
      this.service.readCompanyRequests(this.companyService.companyName).subscribe((req:{"companyName":String, "title":String, "result":String, "comment":String}[])=>{
        if(req.length>0){
          this.title = req[0].title;
          this.result = req[0].result;
          this.comment = req[0].comment;
          this.alreadyApplied = true;

         
        }else{
          this.alreadyApplied = false;
          this.service.readPackage().subscribe((p:Prilog2[])=>{
            if (p){
              this.packages = p[0].packages;
              this.additionals= p[0].additionals;
              for (let i = 0; i < this.additionals.length; i++)
                this.additionalsChecked.push(false);
              for (let i = 0; i < this.packages.length; i++)
                this.radios.push(true);

                for(let i =0; i <this.packages.length; i++){
                  this.service.findReqByTitle(this.packages[i].Title).subscribe((cr:{"companyName":String, "title":String, "result":String, "comment":String}[])=>{
                    if (this.packages[i].MaxCompanies <= cr.length){
                      this.radios[i] = false;
                    }
                  })
                }
    
            }
         
      })
        }
      })



}

radio(packagee:Package){
  let i =0;
  for (i = 0; i < this.packages.length; i++){
    if (this.packages[i] == packagee){
      this.currPackage = this.packages[i];
    }
  }
}

enable(packagee:Package){
  let i =0;
  for (i = 0; i < this.packages.length; i++){
    if (this.packages[i] == packagee){
      return this.radios[i];
    }
  }
}

selectionChange(input: HTMLInputElement, additional:Additional) { 
  
  let i =0;
  for (i = 0; i < this.additionals.length; i++){
    if (this.additionals[i] == additional){
      
      input.checked === true ? this.additionalsChecked[i]=true: this.additionalsChecked[i]=false; 
    }
  }
}

apply(){
  let total =this.currPackage.Price;
  let str;
  str = "Title: " +this.currPackage.Title +"\nContent: "+this.currPackage.Content +"\nVideo promotion minutes: "+
        this.currPackage.VideoPromotion +"\nLessons Number: " + this.currPackage.NoLessons+ "\nWorkchops Number: "+
        this.currPackage.NoWorkchops+ "\nPresentation Number: "+this.currPackage.NoPresentation;

  for(let i =0; i< this.additionals.length; i++){
    if (this.additionalsChecked[i]){
      total= <number>total + <number>this.additionals[i].Price;
      str+="\n"+this.additionals[i].Title;
    }
    
  }
  str+="\n\nTotal Price:"+total;
  alert(str);

  this.service.saveRequest(this.companyService.companyName, this.currPackage.Title, "TBA").subscribe(()=>{
    this.flag = true;
    this.ngOnInit();
  })

}

ok(){
  this.service.deleteReq(this.companyService.companyName, this.title, "Rejected", this.comment).subscribe(()=>{
    this.ngOnInit();
  })
}
logout(){
  sessionStorage.clear();
  this.router.navigate(['/login']);
}
}