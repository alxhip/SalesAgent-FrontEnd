import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Jobs } from '../shared/jobs.model';
import { API_URL } from '../app.constant';
import { JobService } from '../service/job/job.service';
import { UiService } from '../service/ui-service.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  title;
  description;
  jobId = this.activatedRoute.snapshot.params.jobId;

  constructor(private activatedRoute: ActivatedRoute, private jobService: JobService, private router: Router,
              private uiService: UiService) { }

  ngOnInit() {
    if (this.jobId !== '0') {
      this.jobService.getJob(this.jobId).subscribe(data => {
        this.title = data.title;
        this.description = data.description;
      });
    }
  }

  onSave() {
    if (this.jobId !== '0') {
      this.jobService.updateJob(new Jobs(this.jobId, this.title, this.description)).subscribe(data => this.router.navigate(['userJobs']));
      this.uiService.showSnackBar('Job updated successfuly', null, 4000);
    } else {
      this.jobService.saveJob(new Jobs(this.jobId, this.title, this.description)).subscribe(data => this.router.navigate(['userJobs']));
      this.uiService.showSnackBar('Job saved successfuly', null, 4000);
    }

  }

}
