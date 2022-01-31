import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { JsonFormData } from './advance-search/advance-search.component';
import { JsonformService } from './service/jsonform.service';
import { Component, OnInit } from '@angular/core';
export interface dataTable {
  Manifest_Registration_Number: string;
  Manifest_Status: string;
  Submission_Date: string;
  id: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  jsonFormData!: JsonFormData;
  listRecords: dataTable[];
  constructor(private jsonForm: JsonformService) {
    this.listRecords = [];
  }
  ngOnInit(): void {
    this.jsonForm.getJsonForm().subscribe((res: JsonFormData) => {
      this.jsonFormData = res;
    });
    this.getTableData();
  }

  getTableData() {
    this.jsonForm.getTableData().subscribe((res) => {
      console.log(res);
      this.listRecords = res;
    });
  }
}
