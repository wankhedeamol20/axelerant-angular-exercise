import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest.service";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})
export class EventListingComponent implements OnInit {
  apiUrl = environment.apiUrl;
  eventListing:any;
  public searchText : string;

  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.getEventListing();
  }

  getEventListing(){
    this.rest.getDetails(this.apiUrl+'events/').subscribe(
      (response) => {
        this.eventListing = response;
        console.log(response);
      }, (err) => {
        console.error(err);
      }
    );
  }

// filter(input){
//     console.log(this.eventListing);
//     this.eventListing = this.eventListing.filter((el)=>{
//   // console.log(el.eventName.indexOf(input)>-1);
//       return el.eventName.indexOf(input)>-1;
//     });
// }

}
