import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getDetails(url){
    return this.http.get(url);
  }

  updatedEvent(url, data){
    return this.http.put(url, data);
  }

}
