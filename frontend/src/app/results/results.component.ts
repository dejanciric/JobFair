import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Offer } from '../offer.model';
import { CompanyService } from '../company.service';
import { Employed } from '../employed.model';
import { User } from '../user.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  currOfferId:String = "-1";
  flag = false;
  offers:Offer[];
  currentRate=0;

  deadline:String="";
  image:String="";
  employed=false;

  companyName:String="";
  type:String="";
  currDate:String;

  students:{"username":String, "firstname":String, "lastname":String, "result":String, "comment":String}[];

  canRate = false;

  constructor(private service: UsersService, private router: Router, private companyService:CompanyService) { }

  ngOnInit() {
    if (sessionStorage.length > 0){
      if(sessionStorage.getItem("type")!="student"){
        this.router.navigate(['/login']);
      }else{
        this.service.loggedUsername= sessionStorage.getItem("username");
        this.service.user = true;
        this.service.loggedImage = sessionStorage.getItem("image");
      }
    }else{
      this.router.navigate(['/login']);
    }
    this.currOfferId="-1";
    this.flag = false;
    this.image= this.service.getImage();
    //provera dal je zaposlen
    this.service.findEmployed(this.service.loggedUsername).subscribe((employed:Employed)=>{
      if (employed){
        this.employed=true;
        this.companyName = employed.companyName;
        this.type = employed.type;
        this.currDate = employed.date;
        this.companyService.companyName = this.companyName;

        //provera dal je tu 1 meseec
        let reallyCurrDate = this.getCurrDate();
        if (this.checkFirstOneMonthLessThenSecond(<string>this.currDate, <string>reallyCurrDate)){
          this.canRate = true;
        }else{
          this.canRate = false;
        }
        
      }else{
        this.employed=false;
        this.service.readMyOffers(this.service.loggedUsername).subscribe((offers:Offer[])=>{
          this.offers = offers;
          let i = this.offers.length-1;
          while (i >= 0){
            if (this.offers[i].students.length> 0 && this.offers[i].students[0].result=='TBA'){
              this.offers.splice(i,1);
              i--;
              continue;
            }
            this.deadline = this.offers[i].deadline;
            if(!this.expired()){
              this.offers.splice(i,1);
            }
            i--;
          }
        })
      }
    })

  }

  test(students, id){
    
    if (id == this.currOfferId){
      this.flag = false;
      this.currOfferId = "-1";
      return;
    }
    this.currOfferId = id;
    this.flag = true;

    this.students = students;

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

  accept(){
    this.companyService.findOfferById(this.currOfferId).subscribe((offer:Offer)=>{
      this.companyName = offer.companyName;
      this.type= offer.type;
      this.currDate = this.getCurrDate();
      this.employed = true;

      this.service.employ(this.service.loggedUsername, this.companyName, this.type, this.currDate).subscribe(()=>{
        this.flag = false;
        this.companyService.companyName = this.companyName;
        //uvecaj br zaposlenih
        this.service.findCompanyByName(this.companyName).subscribe((user:User)=>{
          let num = +user.employeeNumber;
          num++;
          let str = num+"";
          this.service.updateNum(this.companyName, str).subscribe(()=>{

          })
        })
      })
      
    })
  }

  quit(){
    this.service.removeEmployed(this.service.loggedUsername).subscribe(()=>{
      this.employed = false;
      // smanji br zaposlenih
      this.service.findCompanyByName(this.companyName).subscribe((user:User)=>{
        let num = +user.employeeNumber;
        num--;
        let str = num+"";
        this.service.updateNum(this.companyName, str).subscribe(()=>{
          this.ngOnInit();
        })
      })
    })
  }

  checkFirstOneMonthLessThenSecond(first:string, second:string){
    let f:string[] = first.split("/");
    let s:string[] = second.split("/");
    let firstDate = new Date(+f[2],+f[1]-1, +f[0]);
    let secondDate = new Date(+s[2],+s[1]-1, +s[0]);
    let tmp = secondDate;
    tmp.setMonth(tmp.getMonth()-1);

    if (firstDate <= tmp){
      return true;
    }
    return false;
  }

  expired(){
    let reallyCurrDate = this.getCurrDate();
    let f:string[] = this.deadline.split("/");
    let s:string[] = reallyCurrDate.split("/");
    
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
