import { Injectable } from '@angular/core';

@Injectable()
export class ProductFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    name: '',
    description:'',
    status: '',
    createdBy:'',
    updatedBy:'',
 
  };
 

  constructor() {
    this.validationMessages = {
      name: {
        required: `Sector Name is <strong>required</strong>.`
      },
      description:{
        required: `Description is <strong>required</strong>.`
      },
      status: {
        required: `Status is <strong>required</strong>.`
      },      
     
    };
  }

}
