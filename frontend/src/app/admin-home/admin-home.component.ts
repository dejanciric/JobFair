import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Period } from '../periods.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {



  image:String="";
  success= false;


  constructor(private service:UsersService) { }

  ngOnInit() {
    this.success = false;
    this.image = this.service.getImage();

      this.service.readPeriods().subscribe((p:Period)=>{
        if (p){
          this.service.fromCompanies = p.companiesFrom;
          this.service.fromStudents = p.studentsFrom;
      
          this.service.toCompanies = p.companiesTo;
          this.service.toStudents = p.studentsTo;
        }else{
          this.service.fromCompanies = this.getCurrDate();
          this.service.fromStudents = this.getCurrDate();
      
          this.service.toCompanies = this.currPlus7Days();
          this.service.toStudents = this.currPlus7Days();
        }
 
      })
    

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

  currPlus7Days(){
    let f:string[] = this.getCurrDate().split("/");
    
    let firstDate = new Date(+f[2],+f[1]-1, +f[0]);
    firstDate.setDate((firstDate.getDate()+7));
    
    var dd = firstDate.getDate();
    var mm = firstDate.getMonth()+1; //January is 0!
    var yyyy = firstDate.getFullYear();
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

  save(){
    this.service.updatePeriods(this.service.fromStudents, this.service.toStudents
      , this.service.fromCompanies, this.service.toCompanies).subscribe(()=>{
        this.success=true;
      })
  }

}
