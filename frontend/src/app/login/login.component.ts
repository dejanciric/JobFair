import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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
    if (sessionStorage.length > 0){
      if (sessionStorage.getItem("type")=="student"){
        this.router.navigate(['/student']);
      }else if (sessionStorage.getItem("type")=="admin"){
        this.router.navigate(['/adminHome']);
      }else if (sessionStorage.getItem("type")=="company"){
        this.router.navigate(['/company']);
      }
      this.service.loggedImage = sessionStorage.getItem("image");
      this.service.loggedUsername = sessionStorage.getItem("username");
      this.service.user = true;
    }else{
      this.service.user=false;
    }

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
        if(user.type=='student') {
          sessionStorage.setItem("username", <string>this.username);
          sessionStorage.setItem("type", "student");
          sessionStorage.setItem("image", <string>user.image);

          this.router.navigate(['/student']);
        }
        else if(user.type == 'company'){
          sessionStorage.setItem("username", <string>this.username);
          sessionStorage.setItem("type", "company");
          sessionStorage.setItem("image", <string>user.image);

          this.router.navigate(['/company'])
      } 
        else{
          sessionStorage.setItem("username", <string>this.username);
          sessionStorage.setItem("type", "admin");
          sessionStorage.setItem("image", <string>user.image);

          this.router.navigate(['/adminHome']);
        }
      }else{
        this.passwordMessage = "Invalid username or password";
      }
     
    })
  }

}
