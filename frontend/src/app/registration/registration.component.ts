import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  username:String="";
  password:String="";
  passwordConfirm:String=""
  firstname:String="";
  lastname:String="";
  phone:String="";
  mail:String="";
  year:String="";
  graduated:boolean=false;

  selectedFile:File;

  yearMessage:String="";
  usernameMessage:String="";
  passwordMessage:String="";
  passwordConfirmMessage:String="";
  firstnameMessage:String="";
  lastnameMessage:String="";
  phoneMessage:String="";
  mailMessage:String="";
  imageMessage:String="";

  constructor(private router: Router, private service: UsersService) { }

  ngOnInit() {
  }

  routing(component){
    this.router.navigate([component]);
  }

  register(){
    let flag = false;
    this.usernameMessage = ""; this.passwordMessage =""; this.passwordConfirmMessage="";
    this.firstnameMessage=""; this.lastnameMessage=""; this.phoneMessage=""; this.mailMessage ="";
    if (this.username == ""){
      this.usernameMessage = "Username is required";
      flag = true;
    }
    if (this.password ==""){
      this.passwordMessage = "Password is required";
      flag = true;
    }
    if (this.passwordConfirm ==""){
      this.passwordConfirmMessage = "Password Confirm is required";
      flag = true;
    }
    if (this.firstname ==""){
      this.firstnameMessage = "First Name is required";
      flag = true;
    }    
    if (this.year==""){
      this.yearMessage = "Year of study is requred"
    }
    if (this.lastname ==""){
      this.lastnameMessage = "Last Name is required";
      flag = true;
    }    
    if (this.phone ==""){
      this.phoneMessage = "Phone number is required";
      flag = true;
    }    
    if (this.mail ==""){
      this.mailMessage = "E-mail address is required";
      flag = true;
    }
    if (this.selectedFile == undefined){
      this.imageMessage = "Image is required";
      flag = true;
    }
    if (flag)
      return;

      flag = this.passwordCheck();

      if (this.password != this.passwordConfirm){
        this.passwordConfirmMessage = "Password and confirmation are not equal";
        flag = true;
      }
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(<string>this.mail) == false){
        this.mailMessage = "E-mail address format incorect";
        flag = true;
      }
      if (/^\d+$/.test(<string>this.phone) == false){
        this.phoneMessage  = "Phone number can contain only digits";
        flag = true;
      }
      if (/^\d+$/.test(<string>this.year) == false){
        this.yearMessage  = "Year can contain only digit";
        flag = true;
      }
      if(this.selectedFile.type != "image/jpeg" && this.selectedFile.type != "image/png"){
        this.imageMessage = "Image format is not correct";
        flag = true;
      }
      if (flag)
      return;

      this.service.findByUsername(this.username).subscribe((user: User)=>{
        if(user){
          this.usernameMessage = "Username already exists";
        }else{
          this.service.registerStudent(this.username, this.password, this.firstname, this.lastname, this.phone, this.mail, this.year, this.graduated).subscribe(()=>{
            this.service.uploadFile(this.selectedFile).subscribe(()=>{
              this.router.navigate(['/login']);
            });
           
          })
        }
       
      })


  }

  passwordCheck():boolean{
    let flag = false;
    if (this.password.length < 8 || this.password.length > 12){
      this.passwordMessage = "Password length must be between 8 and 12";
      flag = true;
    }
    if (/\d/.test(<string>this.password) == false){
      this.passwordMessage = "Password must contains at least one number";
      flag = true;
    }
    if (/[A-Z]/.test(<string>this.password) == false){
      this.passwordMessage = "Password must contains at least one UPPERCASE letter";
      flag = true;
    }
    if (/[#*.!?$]/.test(<string>this.password) == false){
      this.passwordMessage= "Password must contains at least one special character";
      flag = true;
    }
    let i = 0;
    let sum = 0;
    let tmp = this.password;
    while (i < this.password.length){
      if (this.password.charAt(i) == tmp.charAt(i).toLowerCase()){
        sum++;
      }
      i++;
    }
    if (sum < 3){
      this.passwordMessage= "Password must contains at least 3 lowercase letters";
      flag = true;
    }
    i = 0;
    while (i < this.password.length-1){
      if (this.password.charAt(i) == tmp.charAt(i+1)){
        this.passwordMessage= "Password can't have successive same characters";
        flag = true;
        break;
      }
      i++;
    }
    tmp = this.password;
    if (tmp.toUpperCase() == tmp.toLowerCase()){
      this.passwordMessage= "Password must start with a letter";
      flag = true;
    }
    
      return flag;
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
    //this.service.uploadFile(selectedFile);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
