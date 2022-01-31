import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataTable } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class JsonformService {
  constructor(private http: HttpClient) {}
  private jsonFormUrl: string = 'http://localhost:3000/jsonForms';
  private tableUrl: string = 'http://localhost:3000/records';

  getJsonForm(): Observable<any> {
    return this.http.get(`${this.jsonFormUrl}`);
  }

  getTableData(): Observable<dataTable[]> {
    return this.http.get<dataTable[]>(`${this.tableUrl}`);
  }

  saveTableData(data: any) {
    this.http.post(`${this.tableUrl}`, data);
  }
}
