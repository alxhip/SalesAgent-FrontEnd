import { Component, OnInit } from '@angular/core';
import { JobService } from '../service/job/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Jobs } from '../shared/jobs.model';
import { UiService } from '../service/ui-service.service';
import { Users } from '../shared/users.module';
import { RetrieveDataService } from '../service/data/retrieve-data.service';
import { RetrieveProfileService } from '../service/profile/retrieve-profile.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobId;
  selectedJob: Jobs = new Jobs(null, null, null);
  jobPublisher;

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: align
    private uiService: UiService, private router: Router) { }

  ngOnInit() {
    this.jobId = this.activatedRoute.snapshot.params.jobId;
    this.jobService.getJob(this.jobId).subscribe(data => {
      this.selectedJob = data;
      this.jobPublisher = data.user.username;
    });


  }

  onApply(jobId) {
    this.jobService.applyJob(jobId).subscribe(
      data => {
        this.uiService.showSnackBar('You have applied succesfully.', null, 4000);
      },
      error => this.uiService.showSnackBar(error.error, null, 4000)
    );
    this.router.navigate(['home']);
  }

}
