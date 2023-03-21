import { Category } from "./modele.catalogue";

export class Product{

    constructor(public id:number, public name:string,public description:string,
       public currentprice:number, public promotion:boolean,public selected:boolean,
      public available:boolean,public photoName:string,public category:Category ){

    }
}

