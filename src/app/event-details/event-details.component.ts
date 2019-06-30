import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RestService } from "../rest.service";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
export class Attendee {
  attendeesName = ['', Validators.required];
}
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  apiUrl = environment.apiUrl;
  eventDetails: any;
  bookingForm: FormGroup;
  submitted = false;
  selectedSeatValidator =false;
  id:any;
  submitBtn = true;
  constructor(private rest: RestService, private route: ActivatedRoute, private _fb: FormBuilder, private router: Router) {
    this.bookingForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]],
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      numberOfSeats: "1",
      attendees: this._fb.array([])
    });
    this.attendees.push(this._fb.group(new Attendee()));
  }

  get attendees(): FormArray {
    return this.bookingForm.get('attendees') as FormArray;
  };

  // convenience getter for easy access to form fields
  get f() { return this.bookingForm.controls; }

  ngOnInit() {
    this.getEventDetail();

  }

  getEventDetail() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.rest.getDetails(this.apiUrl + 'events/' + this.id).subscribe(
      (response) => {
        
        this.eventDetails = response;
        if(!this.eventDetails.availableSeats){
          this.submitBtn =false;
        }
        console.log(response);
      }, (err) => {
        console.error(err);
      }
    );
  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      return;
    }

    //Update the available seat cout by updating the eventDetails
    this.eventDetails.availableSeats = this.eventDetails.availableSeats - this.bookingForm.value.numberOfSeats;
    this.rest.updatedEvent(this.apiUrl + 'events/' + this.id, this.eventDetails).subscribe(
      (response) => {
        alert("Tickets booked.");
        this.bookingForm.reset();
        this.getEventDetail();
        console.log(response);
      }, (err) => {
        console.error(err);
      }
    );
    
  }

  checkSeat() {
    if (this.bookingForm.value.numberOfSeats <= this.eventDetails.availableSeats) {
      while (this.attendees.length !== 0) {
        this.attendees.removeAt(0);
      }
      for (let i = 0; i < this.bookingForm.value.numberOfSeats; i++) {
        this.attendees.push(this._fb.group(new Attendee()));
      }
    } else {
        this.selectedSeatValidator = true;
    }
  }

}
