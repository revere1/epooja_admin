import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ProductFormService } from '../../services/products/product-form.service';
import { ProductModel, FormProductModel } from '../../models/product.model';
import { ToastsManager } from 'ng2-toastr';
import { ProductsService } from '../../services/products.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper/dist/lib/dropzone.interfaces';
import { Router } from '@angular/router';
import { ENV } from '../../env.config';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  @Input() event: ProductModel;
  productForm: FormGroup;
  isEdit: boolean;
  formEvent: FormProductModel;
  formErrors: any;
  formChangeSub: Subscription;
  submitEventObj: ProductModel;
  submitting: boolean;
  submitEventSub: Subscription;
  error: boolean;
  submitBtnText: string;
  public config: DropzoneConfigInterface = {};
  uploadFilesObj = {};
  uploadFiles = [];
  apiEvents = [];
  canRemove: boolean = true;
  constructor(
    private fb: FormBuilder,
    public sc: ProductFormService,
    private router: Router,
    public toastr: ToastsManager,
    private _sectorsService: ProductsService,
  ) {
    this.productForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      status: new FormControl()
    });
  }

  ngOnInit() {
    this.formErrors = this.sc.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Create';
    this.formEvent = this._setFormEvent();
    this._buildForm();

    let that = this;
    var totalsize = 0.0;
    this.config = {
      url: ENV.BASE_API + 'product/path?token=' + this._sectorsService,
      maxFiles: ENV.HELP_MAX_FILES,
      clickable: true,
      createImageThumbnails: true,
      addRemoveLinks: true,
      init: function () {
        let drop = this;
        this.on("addedfile", function (file) {
          totalsize += parseFloat((file.size / (1024 * 1024)).toFixed(2));
        });
        this.on('removedfile', function (file) {
          /*If reupload already existed file, don t delet the file if max lik=mit crossed error uploaded*/
          if (file.status === 'error') {
            let index = (that.uploadFiles).indexOf(that.uploadFilesObj[file.upload.uuid]);
            if (index > -1) {
              return false;
            }
          }
          /*end*/
          if (that.canRemove) {
            //Removing values from array which are existing in uploadFiles variable         
            let index = (that.uploadFiles).indexOf(that.uploadFilesObj[file.upload.uuid]);
            if (index > -1) {
              if (that.uploadFiles.length === ENV.HELP_MAX_FILES) {
                that.formErrors['files'] = '';
                that._setErrMsgs(that.productForm.get('files'), that.formErrors, 'files');
              }
              (that.uploadFiles).splice(index, 1);
              //that.removeFile(that.uploadFilesObj[file.upload.uuid]);
              delete that.uploadFilesObj[file.upload.uuid];
            }
          }
        });
        this.on('error', function (file, errorMessage) {
          drop.removeFile(file);
        });
        this.on('success', function (file) {
        });
      },
      /* Check for total all files size*/
      accept: function (file, done) {
        if (totalsize <= ENV.HELP_MAX_SIZE) {
          done();
        } else {
          done('Total size exceeded');
        }
      }
    };
  }
  // private removeFile(file) {
  //   let apiEvent = this._sectorsService.removeFile(file).subscribe(
  //     data => {
  //       this._handleSubmitSuccess(data);
  //     },
  //     err => this._handleSubmitError(err)
  //   );
  //   (this.apiEvents).push(apiEvent);
  // }

  public onUploadSuccess(eve) {
    if ((eve[1].success !== undefined) && eve[1].success) {
      this.formErrors['files'] = '';
      //Object.assign(this.uploadFilesObj,{[eve[0].lastModified]:eve[1].data});
      Object.assign(this.uploadFilesObj, { [eve[0].upload.uuid]: eve[1].data });
      (this.uploadFiles).push(eve[1].data);
    }
    else {
      this.formErrors['files'] = 'Something Went Wrong';
    }
    this._setErrMsgs(this.productForm.get('files'), this.formErrors, 'files');
  }
  public onUploadError(eve) {
    this.formErrors['files'] = eve[1];
    this._setErrMsgs(this.productForm.get('files'), this.formErrors, 'files');
  }
  private _buildForm() {
    let validRules = {
      name: [this.formEvent.name, [
        Validators.required
      ]],
      description: [this.formEvent.description, [
        Validators.required
      ]],
      quantity: [this.formEvent.quantity, [
        Validators.required
      ]],
      cost: [this.formEvent.cost, [
        Validators.required
      ]],
      status: [this.formEvent.status, [
        Validators.required
      ]]
    };

    this.productForm = this.fb.group(validRules);
    this.formChangeSub = this.productForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.productForm);
    }
    this._onValueChanged();
  }



  private _setFormEvent() {
    if (!this.isEdit) {
      return new FormProductModel(null, null, null,null,null,null,null,[]);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      return new FormProductModel(
        this.event.name,
        this.event.description,
        this.event.quantity,
        this.event.cost,
        this.event.status,
        this.event.createdBy,
        this.event.updatedBy,
        this.event.files,
       
      );
    }
  }


  private _onValueChanged() {
    if (!this.productForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.sc.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + '<br>';
          }
        }
      }
    };
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        _setErrMsgs(this.productForm.get(field), this.formErrors, field);
      }
    }
  }

  _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
    if (control && control.dirty && control.invalid) {
      const messages = this.sc.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + '<br>';
        }
      }
    }
  };
  resetForm() {
    this.productForm.reset();
  }

  private _getSubmitObj() {
    let curUserObj = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(curUserObj);
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new ProductModel(
      this.productForm.get('name').value,
      this.productForm.get('description').value,
      this.productForm.get('quantity').value,
      this.productForm.get('cost').value,
      this.productForm.get('status').value,
      35,
      35,
      this.event ? this.event.id : null,
      this.event ? this.event.files : this.uploadFiles,
      
    );
  }
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    if (res.success) {
      this.toastr.success(res.message, 'Success');
      this.router.navigate(['products']);
    }
    else {
      this.toastr.error(res.message, 'Invalid');
    }

  }

  private _handleSubmitError(err) {
    this.toastr.error(err.message, 'Error');
    this.submitting = false;
    this.error = true;
  }
  saveProduct() {
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();
    console.log(this.submitEventObj)
    // if (!this.isEdit) {

    //   this.submitEventSub = this._sectorsService
    //     .postEvent$(this.submitEventObj)
    //     .subscribe(
    //       data => this._handleSubmitSuccess(data),
    //       err => this._handleSubmitError(err)
    //     );

    // // } else {

    //   this.submitEventSub = this._sectorsService
    //     .editEvent$(this.event.id, this.submitEventObj)
    //     .subscribe(

    //       data => this._handleSubmitSuccess(data),

    //       err => this._handleSubmitError(err)
    //     );
    // }
  }
}
