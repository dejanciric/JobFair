import { Component, OnInit } from '@angular/core';
import { Education } from '../education.model';
import { Work } from '../work.model';
import { UsersService } from '../users.service';
import { CV } from '../cv.model';
import { Period } from '../periods.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  editing=false;

  personalInfo = false;
  typeOfApplication = false;
  education=false;
  workExperience=false;
  languages = false;
  additionalSkills = false;

  subtitle:String = "";

  firstname:String="";
  lastname:String="";
  address:String="";
  postcode:String="";
  city:String="";
  country:String="";
  phoneType:String="Mobile";
  phone:String="";
  mail:String="";
  applicationType:String="Full time job";
  description:String="";
  additionalSkillsText:String="";


  educations:Education[]=[];
  educationFrom="";
  educationTo="";
  educationName="";
  educationCity="";
  educationCountry="";

  works:Work[]=[];
  workFrom="";
  workTo="";
  workCompanyName="";
  workCity="";
  workCountry="";
  workPosition="";

  language1knowladge:String="Basic";
  language3knowladge:String="Basic";
  language2knowladge:String="Basic";
  language1:String="";
  language2:String="";
  language3:String="";

  image:String="";

  disable=false;

  constructor(private service: UsersService, private router:Router) { }

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
    this.image = this.service.getImage();
    let currDate = new Date();
    this.service.readPeriods().subscribe((p:Period)=>{
      let f:string[] = p.studentsFrom.split("/");
      let from = new Date(+f[2],+f[1]-1, +f[0]);
  
      let t:string[] = p.studentsTo.split("/");
      let to = new Date(+t[2],+t[1]-1, +t[0]);
  
      if (currDate >= from && currDate <=  to)
      this.disable = false;
      else
      this.disable = true;
    })
    this.service.readCV().subscribe((cv:CV)=>{
      this.firstname=cv.firstname;
      this.lastname=cv.lastname;
      this.address=cv.address;
      this.postcode=cv.postcode;
      this.city=cv.city;
      this.country=cv.country;
      this.phoneType=cv.phoneType;
      this.phone=cv.phone;
      this.mail=cv.mail;
      this.applicationType=cv.applicationType;
      this.description=cv.description;
      this.additionalSkillsText=cv.additionalSkillsText;

      this.educations = cv.educations;
      this.works = cv.works;

      this.language1knowladge=cv.language1knowladge;
      this.language3knowladge=cv.language2knowladge;
      this.language2knowladge=cv.language3knowladge;
      this.language1=cv.language1;
      this.language2=cv.language2;
      this.language3=cv.language3;
    })
  }

  toggle(subtitle){


    switch(subtitle){
      case "personalInfo":
      if (this.personalInfo == true){
        this.personalInfo = false;
      }else{
        this.personalInfo = true;
        this.typeOfApplication = false;
        this.education=false;
        this.workExperience=false;
        this.languages = false;
        this.additionalSkills = false;
      }
      this.subtitle = "Personal Informanion";
      break;
      case "typeOfApplication":
      if (this.typeOfApplication == true){
        this.typeOfApplication = false;
      }else{
        this.personalInfo = false;
        this.typeOfApplication = true;
        this.education=false;
        this.workExperience=false;
        this.languages = false;
        this.additionalSkills = false;
      }      
      this.subtitle = "Type of Application";
      break;
      case "education":
      if (this.education == true){
        this.education = false;
      }else{
        this.personalInfo = false;
        this.typeOfApplication = false;
        this.education=true;
        this.workExperience=false;
        this.languages = false;
        this.additionalSkills = false;
      }     
      this.subtitle = "Education";
      break;
      case "workExperience":
      if (this.workExperience == true){
        this.workExperience = false;
      }else{
        this.personalInfo = false;
        this.typeOfApplication = false;
        this.education=false;
        this.workExperience=true;
        this.languages = false;
        this.additionalSkills = false;
      }          
       this.subtitle = "Work Experience";
      break;
      case "languages":
      if (this.languages == true){
        this.languages = false;
      }else{
        this.personalInfo = false;
        this.typeOfApplication = false;
        this.education=false;
        this.workExperience=false;
        this.languages = true;
        this.additionalSkills = false;
      }           
      this.subtitle = "Languages";
      break;
      case "additionalSkills":
      if (this.additionalSkills == true){
        this.additionalSkills = false;
      }else{
        this.personalInfo = false;
        this.typeOfApplication = false;
        this.education=false;
        this.workExperience=false;
        this.languages = false;
        this.additionalSkills = true;
      }           
      this.subtitle = "Additional Skills";
      break;

    }


  }

  save(subtitle){
    this.service.updateCV(this.service.loggedUsername,
      this.firstname,
      this.lastname,
      this.address,
      this. postcode,
      this.city,
      this. country,
      this.phoneType,
      this.phone,
      this. mail,
      this.applicationType,
      this.description,
      this.additionalSkillsText,
      this.educations,
      this.works,
      this.language1,
      this.language2,
      this.language3,
      this.language1knowladge,
      this.language2knowladge,
      this.language3knowladge ).subscribe(()=>{
        this.personalInfo = false;
        this.typeOfApplication = false;
        this.education=false;
        this.workExperience=false;
        this.languages = false;
        this.additionalSkills = false;
      });
  }

  addEducation(){
    this.educations.push({editing:false, name:this.educationName, to:this.educationTo, from:this.educationFrom, city:this.educationCity, country:this.educationCountry});
    this.educationFrom="";
    this.educationTo="";
    this.educationName="";
    this.educationCity="";
    this.educationCountry="";
  }

  addWork(){
    this.works.push({editing:false, name:this.workCompanyName, to:this.workTo, from:this.workFrom, city:this.workCity, country:this.workCountry, position:this.workPosition});
    this.workFrom="";
    this.workTo="";
    this.workCompanyName="";
    this.workCity="";
    this.workCountry="";
    this.workPosition="";
  }

  editEducation(education:Education){
    education.editing = true;
  }
  editSave(education:Education){
    education.editing=false;
  }

  editSaveWork(work:Work){
    work.editing=false;
  }
  editWork(work:Work){
    work.editing = true;
  }

  inPeriod(){
    let currDate = new Date();
    this.service.readPeriods().subscribe((p:Period)=>{
      let f:string[] = p.studentsFrom.split("/");
      let from = new Date(+f[2],+f[1]-1, +f[0]);
  
      let t:string[] = p.studentsTo.split("/");
      let to = new Date(+t[2],+t[1]-1, +t[0]);
  
      if (currDate >= from && currDate <=  to)
      return true;
      else
      return false;
    })

  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }



}
