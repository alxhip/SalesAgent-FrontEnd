import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jobs } from 'src/app/shared/jobs.model';
import { API_URL } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class RetrieveDataService {

  constructor(private http: HttpClient) { }

  RetrieveAllData() {
    return this.http.get<Jobs[]>(API_URL + '/api/jobs');
  }

  retrieveJobsByUserId(id) {
    return this.http.get<Jobs[]>(API_URL + `/api/${id}`);
  }

}
