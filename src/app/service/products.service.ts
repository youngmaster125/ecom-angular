import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   host:string;
  constructor(private http:HttpClient,private authService:AuthentificationService) { 
    this.host="http://localhost:8080"
  }
  public getRessource(url:any)  {
    return  this.http.get(this.host+url);
    
  }
  uploadPhotoProduct(file:File,idProduct:number):Observable<HttpEvent<{}>>{
    let formData=new FormData()
    formData.append('file',file)
    const req=new HttpRequest('POST',this.host+'/uploadPhoto/'+idProduct,formData,{
      reportProgress:true,
      responseType:"text"
    })
    return this.http.request(req)
    }

}
