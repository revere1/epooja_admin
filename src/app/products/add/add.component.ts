import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form: FormGroup;
  num = 5;

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const certainPassword = new FormControl('', CustomValidators.notEqualTo(password));

    this.form = new FormGroup({
      password: password,
      certainPassword: certainPassword
    });
  }

  onSubmit(form) {
    console.log(form);
  }

}
