import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RestService } from "../rest.service";
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  apiUrl = environment.apiUrl;
  eventDetails:any;
  constructor(private rest: RestService, private route: ActivatedRoute, private _fb: FormBuilder) { }

  ngOnInit() {
    this.getEventDetail();
  }
  getEventDetail(){
    let id = this.route.snapshot.paramMap.get("id");
    this.rest.getDetails(this.apiUrl+'events/'+id).subscribe(
      (response) => {
        this.eventDetails = response;
        console.log(response);

        

      }, (err) => {
        console.error(err);
      }
    );
  }

}
