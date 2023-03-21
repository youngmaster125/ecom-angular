import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private host:string;
  constructor(private http:HttpClient) { 
    this.host="http://localhost:8080"


  }
  public getRessource(url:any)  {
    return  this.http.get(this.host+url);
    
  }
}
