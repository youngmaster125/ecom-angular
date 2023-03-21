import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
onProductsDetails(_t10: any) {
throw new Error('Method not implemented.');
}
  products:any
  editPhoto:any
  currentProduct:any
 selectedFile!: FileList;
 progress!:number
 currentFileUpload:any
 tilte!:string
 timestamp=0
  constructor(public productService:ProductsService,
    private route:ActivatedRoute,private router:Router,
   public authService:AuthentificationService) 
    { 

    }

  ngOnInit(): void {
    console.log(this.authService.isAdmin())
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd  ){
        let url=val.url
        console.log(url)
        let p1=this.route.snapshot.params['p1']
  
        if(p1==1){
          this.tilte="Les produits selectionne"
          this.getProduct("/products/search/seletectedproducts")
          
        }
        else if(p1==2){
          
        let idcat=this.route.snapshot.params['p2']
        this.tilte="Les produits de la categorie"+idcat
        this.getProduct("/categories/"+idcat+"/products")
        }
        else if(p1==3){
          this.tilte="Les produits en promotion"
          this.getProduct("/products/search/promoproducts")
          }
          else if(p1==4){
            this.tilte="Les produits disponible"
            this.getProduct("/products/search/dispoproducts")
            }
            else if(p1==5){
              this.tilte="Les produits en rechercher"
              this.getProduct("/products/search/dispoproducts")
              }
      }
    })
    let p1=this.route.snapshot.params['p1']
  
    if(p1==1){
      this.getProduct("/products/search/seletectedproducts")
      
    }  

  }
  public getProduct(url:string){
    this.productService.getRessource(url).subscribe(data=>{
    this.products=data
    },err=>{
      console.log(err)
    })
  }
  onEditPhoto(p:any){
this.editPhoto=true
this.currentProduct=p
  }
  onSelectedFile(event:Event){
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files as FileList;
    this.progress=0
    

  }
  upload(){
  this.progress=0
  this.currentFileUpload=this.selectedFile.item(0)
  console.log(this.currentProduct.id)
  this.productService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(
    event=>{
      if(event.type===HttpEventType.UploadProgress){
        
        this.progress=Math.round(100*event.loaded/event.total!)
        
      }else if(event instanceof HttpResponse){
       alert("photo upload")
       this.timestamp=Date.now()
       
      }
    },err=>{
     alert("Probleme de chargement"+err  )
     
    }
  )

  }
  getTS(){
   // return Date.now()
   return this.timestamp
  }
}
