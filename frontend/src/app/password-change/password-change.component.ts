import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  username:String = "";
  oldPassword:String = "";
  newPassword:String = "";

  usernameMessage:String = "";
  oldPasswordMessage:String = "";
  newPasswordMessage:String = "";

  constructor(private service: UsersService, private router: Router) { }

  ngOnInit() {
  }

  change(){
    let flag = false;
    this.usernameMessage = ""; this.oldPasswordMessage =""; this.newPasswordMessage ="";
    if (this.username == ""){
      this.usernameMessage = "Username is required";
      flag = true;
    }
    if (this.oldPassword ==""){
      this.oldPasswordMessage = "Old Password is required";
      flag = true;
    }
    if (this.newPassword ==""){
      this.newPasswordMessage = "New Password is required";
      flag = true;
    }
    if (flag)
    return;
    if (this.newPassword.length < 8 || this.newPassword.length > 12){
      this.newPasswordMessage = "New Password length must be between 8 and 12";
      flag = true;
    }
    if (/\d/.test(<string>this.newPassword) == false){
      this.newPasswordMessage = "New Password must contains at least one number";
      flag = true;
    }
    if (/[A-Z]/.test(<string>this.newPassword) == false){
      this.newPasswordMessage = "New Password must contains at least one UPPERCASE letter";
      flag = true;
    }
    if (/[#*.!?$]/.test(<string>this.newPassword) == false){
      this.newPasswordMessage= "New Password must contains at least one special character";
      flag = true;
    }
    let i = 0;
    let sum = 0;
    let tmp = this.newPassword;
    while (i < this.newPassword.length){
      if (this.newPassword.charAt(i) == tmp.charAt(i).toLowerCase()){
        sum++;
      }
      i++;
    }
    if (sum < 3){
      this.newPasswordMessage= "New Password must contains at least 3 lowercase letters";
      flag = true;
    }
    i = 0;
    while (i < this.newPassword.length-1){
      if (this.newPassword.charAt(i) == tmp.charAt(i+1)){
        this.newPasswordMessage= "New Password can't have successive same characters";
        flag = true;
        break;
      }
      i++;
    }
    tmp = this.newPassword;
    if (tmp.toUpperCase() == tmp.toLowerCase()){
      this.newPasswordMessage= "New Password must start with a letter";
      flag = true;
    }
    if (flag)
      return;
    //console.log(this.username);
    this.service.login(this.username, this.oldPassword).subscribe((user: User)=>{
      if(user){
        this.service.changePassword(this.username, this.oldPassword, this.newPassword).subscribe(()=>{
          this.router.navigate(['/login']);
        })
      }else{
        this.newPasswordMessage = "Invalid username or password";
  
      }
    })



  }


}
