class ProductModel {
    constructor(
      public name: string,
      public description :string,
      public quantity:number,
      public cost: string,
      public status: string,
      public createdBy: number,
      public updatedBy: number,
      public id?: number,
      public files = [],
      
    ) { }
  }
  
  class FormProductModel {
    constructor(
      public name: string,
      public description :string,
      public quantity:number,
      public cost: string,
      public status: string,
      public createdBy: number,
      public updatedBy: number,
      public files = [],
      
   
     
    ) { }
  }
  
  export {ProductModel, FormProductModel };