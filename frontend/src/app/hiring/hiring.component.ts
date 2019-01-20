import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Offer } from '../offer.model';

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.scss']
})
export class HiringComponent implements OnInit {

  image:String="";

  currDate:String="";
  deadline:String="";


  offers:Offer[];
  flag = false;
  currOfferId:String = "-1";
  students:{"username":String, "firstname":String, "lastname":String, "result":String, "comment":String}[];

  constructor(private service:UsersService, private router:Router) { }

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
    this.currDate=this.getCurrDate();
    this.image=this.service.getImage();

    this.flag = false;
    this.currOfferId = "-1";
    this.service.readCompanyOffers(this.service.loggedUsername).subscribe((offers:Offer[])=>{
      this.offers = offers;
      let i = this.offers.length-1;
      while (i >= 0){//proveriti dal je istekao
        if (this.offers[i].students.length> 0 && this.offers[i].students[0].result!='TBA'){
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

  finish(){
    this.service.applyToOffer(this.currOfferId, this.students).subscribe(()=>{
      this.ngOnInit();
    })
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
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
