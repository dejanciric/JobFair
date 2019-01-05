import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:String = "";
  password:String = "";
  usernameMessage:String = "";
  passwordMessage:String = "";

  constructor(private service: UsersService, private router: Router) { }

  ngOnInit() {
    this.service.user=false;
  }

  registration(){
    this.router.navigate(['/registration']);
  }

  login():void{
    let flag = false;
    this.usernameMessage = ""; this.passwordMessage ="";
    if (this.username == ""){
      this.usernameMessage = "Username is required";
      flag = true;
    }
    if (this.password ==""){
      this.passwordMessage = "Password is required";
      flag = true;
    }
    if (flag)
      return;
    //console.log(this.username);
    this.service.login(this.username, this.password).subscribe((user: User)=>{
      if(user){
        this.service.user=true;
        this.service.loggedUsername = this.username;
        this.service.loggedImage = user.image;
        if(user.type=='student') this.router.navigate(['/student']);
        else if(user.type == 'company') this.router.navigate(['/company'])
        else{
          this.router.navigate(['/admin']);
        }
      }else{
        this.passwordMessage = "Invalid username or password";
      }
     
    })
  }


}
