import { dataTable } from './../app.component';
import { JsonformService } from './../service/jsonform.service';
import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface JsonFormValidators {
  min: number;
  max: number;
  required: boolean;
  requiredTrue: boolean;
  email: boolean;
  minLength: boolean;
  maxLength: boolean;
  pattern: string;
  nullValidator: boolean;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  placeholder: string;
  tooltip: string;
  options: [];
  validators: JsonFormValidators;
  error: {};
}

export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css'],
})
export class AdvanceSearchComponent implements OnInit, OnChanges {
  @Input() jsonFormData: JsonFormData;
  @Input() tableData: dataTable[];
  public myForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder, private service: JsonformService) {
    this.jsonFormData = { controls: [] };
    this.tableData = [];
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.jsonFormData.firstChange) {
      console.log(this.jsonFormData.controls);
      this.createForm(this.jsonFormData.controls);
    }
  }
  createForm(controls: JsonFormControls[]) {
    controls.forEach((control) => {
      const validatorsToAdd = [];
      for (let [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    });
  }
  onSubmit() {
    console.log(this.myForm.value);
  }
}
