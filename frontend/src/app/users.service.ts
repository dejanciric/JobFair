import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { last } from '@angular/router/src/utils/collection';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri='http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password){
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  changePassword(username, oldPassword, newPassword){
    const data ={
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post(`${this.uri}/changePassword`, data);
  }

  findByUsername(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/findByUsername`, data);
  }

  registerStudent(username, password, firstname, lastname, phone, mail, year, graduated){
    let grad = "no";
    if (graduated){
      grad = "yes";
    }
    const data = {
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      phone:phone,
      mail:mail,
      type:"student",
      year:year,
      graduated:grad
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  registerAdmin(username, password, firstname, lastname, phone, mail){
    const data = {
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      phone:phone,
      mail:mail,
      type:"admin"
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  registerCompany(username, password, firstname, lastname, companyName, mail,city, address, PIB, employeeNumber, webSite, work, special ){
    const data = {
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      companyName:companyName,
      mail:mail,
      type:"company",
      city:city,
      address:address,
      PIB:PIB,
      employeeNumber:employeeNumber,
      webSite:webSite,
      work:work,
      special:special
    }

    return this.http.post(`${this.uri}/register`, data);
  }


}
