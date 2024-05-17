export interface signUpValue {
  name: string;
  email: string;
  password: string;
}
export interface loginValue { 
  email: string;
  password: string;
}

export interface product {
  name:string,
  id:any,
  price:number,
  color:string,
  category:string,
  description:string,
  image:string,
  quantity:undefined | number
} 

export interface cart {
  name:string,
  id:any |undefined,
  price:number,
  color:string,
  category:string,
  description:string,
  image:string,
  quantity:undefined | number,
  userId:any,
  productId:any
} 

export interface priceSummary {
  price: number,
  discount:number,
  tex:number,
  delivery:number,
  total:number,
}