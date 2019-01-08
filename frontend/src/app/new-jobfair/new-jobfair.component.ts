import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Jobfair } from '../jobfair.model';
import { Package } from '../package.model';
import { Additional } from '../additional.model';


@Component({
  selector: 'app-new-jobfair',
  templateUrl: './new-jobfair.component.html',
  styleUrls: ['./new-jobfair.component.scss']
})
export class NewJobfairComponent implements OnInit {

  active=false;
  jobfair:Jobfair = {	
    "Fair": "",
    "StartDate": "",
    "EndDate": "",
    "StartTime": "",
    "EndTime": "",
    "Place": "",
    "About": ""
    };
    locations:{"Name":String}[]=[];
    message:String="";
    message2:String="";

    slots:{"startTime":String,"endTime":String,"type":String,"place":String}[]=[];
    image:String="";
    packages:Package[]=[];
    additionals:Additional[]=[];

    allslots:String[];
    constructor(private service:UsersService) { }


  jobfairTitle:String="";
  startDate:String ="";
  endDate:String="";
  about:String="";
  startTime:String="";
  endTime:String="";
  place:String="";
  ngOnInit() {
    this.message="";
    this.message2="";
    this.image = this.service.getImage();

    this.service.getJobfair().subscribe((j:Jobfair)=>{
      if (j){
        this.active = true;
        this.jobfairTitle = j.Fair;
        this.startDate = j.StartDate;
        this.endDate = j.EndDate;
        this.about = j.About;
        this.startTime = j.StartTime
        this.endTime = j.EndTime;
        this.place = j.Place;
      }else{
        this.active = false;
      }
    })


  }
  
  addSlot(){
    this.slots.push({"startTime":"","endTime":"","type":"","place":""})
  }

  logo="";

  onLogoSelected(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
          this.logo = event.target.result;
     
      }

      reader.readAsDataURL(event.target.files[0]);
  }
  }

  finish(){
    //upisati u bazu sve procitano
    let slots = [];
    for (let i = 0; i< this.slots.length; i++){
      let str = this.slots[i].startTime+"-"+this.slots[i].endTime+" "+this.slots[i].place+" ["+this.slots[i].type+"]";
      slots.push(str);
    }
   
      this.service.savePackages(this.packages, this.additionals).subscribe(()=>{
        this.service.updateSlot("-1", slots).subscribe(()=>{
          this.service.saveJobfair(this.jobfair).subscribe(()=>{
            this.ngOnInit();
          })
        })
       
      })
  
  }

  add(){
    this.packages.push({"Title":"", "Content":[""], "VideoPromotion":0,"Price":0,"NoWorkchops":0,"NoPresentation":0,"NoLessons":0,"MaxCompanies":0})
  }

  addContent(packagee:Package){
    packagee.Content.push("");
  }

  addAdditional(){
    this.additionals.push({"Title":"", "Price":0});
  }
  url;
  onFileSelected(event){
    //procitati fajl isparsirati i popuniti nizove
    /*console.log(event);
    let file:File = event.taget.files[0];
    this.appSettingsService.getJSON().subscribe(data => {
      console.log(data)
  });*/
 
  var reader = new FileReader();

  reader.onload = (event: ProgressEvent) => {
      this.url = (<FileReader>event.target).result;

      this.service.getJSON(this.url).subscribe((data) => {
        //let prilog = plainToClass(Prilog2, data);
        try{    
          if (data.Additional == undefined || data.Packages == undefined){
            this.message2 = "Invalid format of JSON";

          }else{
            this.additionals = data.Additional;
            this.packages = data.Packages;
            this.message2="";
          }
          
            
          
        }catch(Exception){
          this.message2 = "Invalid format of JSON";
        }

    });

  }

  reader.readAsDataURL(event.target.files[0]);

  }

  addLocation(){
    this.locations.push({"Name":""});
  }

  onJobfairFileSelected(event){
    //procitati fajl isparsirati i popuniti nizove
    /*console.log(event);
    let file:File = event.taget.files[0];
    this.appSettingsService.getJSON().subscribe(data => {
      console.log(data)
  });*/
 
  var reader = new FileReader();

  reader.onload = (event: ProgressEvent) => {
      this.url = (<FileReader>event.target).result;

      this.service.getJSON(this.url).subscribe((data) => {
        //let prilog = plainToClass(Prilog2, data);
        try{
          data.Fairs; data.Location;
          if (data.Fairs.length > 1 || data.Locations.length > 1){
            this.message = "Invalid format of JSON";
          }else{
            this.jobfair= data.Fairs[0];
            this.locations= data.Locations[0].Location
            this.message="";
          }
        }catch(Exception){
          this.message = "Invalid format of JSON";
        }


        
    });

  }

  reader.readAsDataURL(event.target.files[0]);

  }

  end(){
    this.service.deletePackages().subscribe(()=>{
      this.service.updateSlot("-1", []).subscribe(()=>{
        this.service.deleteJobfair().subscribe(()=>{
          this.active = false;
        })
      })
    })
  }

}
