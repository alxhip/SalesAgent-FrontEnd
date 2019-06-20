import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import { Jobs } from 'src/app/shared/jobs.model';
import { USER_ID } from '../auth/authenticate-user.service';
import { UiService } from '../ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient, private uiService: UiService) { }

  getJob(jobId) {
    return this.http.get<Jobs>(API_URL + `/api/jobs/${jobId}`);
  }

  updateJob(job: Jobs) {
    return this.http.put(API_URL + '/api/jobs', job);
  }

  deleteJob(id) {
    return this.http.delete(API_URL + `/api/jobs/${id}`, { responseType: 'text' });
  }

  saveJob(job: Jobs) {
    return this.http.post(API_URL + '/api/jobs', job);
  }

  applyJob(jobId) {
    return this.http.post(API_URL + '/api/jobs/apply ', { jobId, userId: sessionStorage.getItem(USER_ID) }, { responseType: 'text' });
  }
}
