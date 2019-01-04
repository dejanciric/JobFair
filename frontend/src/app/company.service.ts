import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  uri='http://localhost:4000';

  companyUsernameForDetails:String="";
  companyName:String="";
  selectedOfferId:String = "";

  constructor(private http: HttpClient) { }

  searchCompany(companyName, city, works){
    const data = {
      companyName:companyName,
      city:city,
      work:works,
    }
    return this.http.post(`${this.uri}/searchCompany`, data);
  }

  findByUsername(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/findByUsername`, data);
  }
  
  findOfferByCompany(username){
    const data = {
      companyUsername:username
    }

    return this.http.post(`${this.uri}/findOfferByCompany`, data);
  }

  findOfferById(id){
    const data = {
      id:id
    }

    return this.http.post(`${this.uri}/findOfferById`, data);
  }
}
