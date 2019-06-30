import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListingComponent } from './event-listing/event-listing.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {
    path: 'event-listing',
    component: EventListingComponent
  },
  {
    path: 'event-details/:id',
    component: EventDetailsComponent
  },
  {
    path: '',
    component: EventListingComponent
  },
  {
    path: '**',
    redirectTo: 'event-listing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
