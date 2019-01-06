import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { last } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri='http://localhost:4000'
  updatePath:String = "http://localhost:4000/uploads/";

  loggedUsername:String="";
  loggedImage:String="";
  user = false;
  
  constructor(private http: HttpClient) { 
    

  }

  getImage():String{
    return <string>this.updatePath + this.loggedImage;
  }
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
      graduated:grad,
      image: ""
    }
    const cv = {
      username: username,
      firstname: "",
      lastname: "",
      address: "",
      postcode:"",
      city: "",
      country: "",
      phoneType: "Mobile",
      phone: "",
      mail: "",
      applicationType:"Full time job",
      description: "",
      additionalSkillsText: "",
      educations: [],
      works: [],
      language1: "",
      language2:"",
      language3: "",
      language1knowladge: "Basic",
      language2knowladge:"Basic",
      language3knowladge: "Basic"
    }
    this.http.post(`${this.uri}/initializeCV`, cv).subscribe(()=>{

    });
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
      type:"admin",
      image:""
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
      special:special,
      image:""
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  uploadFile(selectedFile:File){
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    return this.http.post(`${this.uri}/uploadImage`, fd);
  }

  uploadFileOffer(selectedFile:File){
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    return this.http.post(`${this.uri}/uploadFileOffer`, fd);
  }

  readCV(){
    const data = {
      username:this.loggedUsername
    }

    return this.http.post(`${this.uri}/readCV`, data);
  }

  updateCV(username,
    firstname,
    lastname,
    address,
    postcode,
    city,
    country,
    phoneType,
    phone,
    mail,
    applicationType,
    description,
    additionalSkillsText,
    educations,
    works,
    language1,
    language2,
    language3,
    language1knowladge,
    language2knowladge,
    language3knowladge ){

      const data={
        username:username,
        firstname:firstname,
        lastname:lastname,
        address:address,
        postcode:postcode,
        city:city,
        country:country,
        phoneType:phoneType,
        phone:phone,
        mail:mail,
        applicationType:applicationType,
        description:description,
        additionalSkillsText:additionalSkillsText,
        educations:educations,
        works:works,
        language1:language1,
        language2:language2,
        language3:language3,
        language1knowladge:language1knowladge,
        language2knowladge:language2knowladge,
        language3knowladge:language3knowladge
      }

      return this.http.post(`${this.uri}/updateCV`, data);

    }

    searchOffer(title, type){
      const data = {
        title:title,
        type:type
      }
      return this.http.post(`${this.uri}/searchOffer`, data);
    }

    findCompanyByName(name){
      const data = {
        companyName:name

      }
      return this.http.post(`${this.uri}/findCompanyByName`, data);
    }

    applyToOffer(offerId, students){
      const data = {
        id:offerId,
        students:students

      }
      return this.http.post(`${this.uri}/applyToOffer`, data);
    }

    readMyOffers(username){
      const data ={
        username:username
      }
      return this.http.post(`${this.uri}/readMyOffers`, data);

    }

    findEmployed(username){
      const data ={
        username:username
      }
      return this.http.post(`${this.uri}/findEmployed`, data);
    }
    removeEmployed(username){
      const data ={
        username:username
      }
      return this.http.post(`${this.uri}/removeEmployed`, data);
    }
    employ(username, companyName, type, date){
      const data ={
        username:username,
        companyName: companyName,
        date: date,
        type: type
      }
      return this.http.post(`${this.uri}/employ`, data);
    }

    updateNum(companyName, employeeNumber){
      const data ={
        companyName: companyName,
        employeeNumber: employeeNumber
      }
      return this.http.post(`${this.uri}/updateNum`, data);
    }

    findAllOffers(){
      return this.http.get(`${this.uri}/findAllOffers`);
    }

    publishOffer(id, title, type, deadline, content, companyName, companyUsername, image){
      const data={
        id:id,
        title:title,
        type:type,
        deadline:deadline,
        content:content,
        companyName:companyName,
        companyUsername:companyUsername,
        image:image,
        students:[]
      }
      return this.http.post(`${this.uri}/publishOffer`, data);
    }

    readCompanyOffers(companyUsername){
      const data ={
        companyUsername: companyUsername
      }
      return this.http.post(`${this.uri}/readCompanyOffers`, data);
    }

    getJSON(url): Observable<any>{
      return this.http.get(url);
    }

    savePackages(packages, additionals){
      const data ={
        packages: packages,
        additionals: additionals
      }
      return this.http.post(`${this.uri}/savePackages`, data);
    }

    deletePackages(){
      return this.http.get(`${this.uri}/deletePackages`);

    }

    readPackage(){
      return this.http.get(`${this.uri}/readPackage`);

    }
    readCompanyRequests(companyName){
      const data ={
        companyName: companyName
      }
      return this.http.post(`${this.uri}/readCompanyRequests`, data);
    }

    readAllRequests(){
      const data ={
        companyName: ""
      }
      return this.http.post(`${this.uri}/readAllRequests`, data);
    }

    saveRequest(companyName, title, result){
      const data ={
        companyName: companyName,
        title:title,
        result:result,
        comment:""
      }
      return this.http.post(`${this.uri}/saveRequest`, data);
    }

    updateRequests(companyName, title, result, comment){
      const data ={
        companyName: companyName,
        title:title,
        result:result,
        comment:comment
      }
      return this.http.post(`${this.uri}/updateRequests`, data);
    }

    findReqByTitle(companyName){
      const data ={
        title: companyName

      }
      return this.http.post(`${this.uri}/findReqByTitle`, data);
    }

    deleteReq(companyName, title, result, comment){
      const data ={
        companyName: companyName,
        title:title,
        result:result,
        comment:comment
      }
      return this.http.post(`${this.uri}/deleteReq`, data);
    }
}
