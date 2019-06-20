import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../service/data/retrieve-data.service';
import { USER_ID } from '../service/auth/authenticate-user.service';
import { Jobs } from '../shared/jobs.model';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { JobService } from '../service/job/job.service';
import { UiService } from '../service/ui-service.service';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {
  columnsToDisplay = ['title', 'description', 'action'];
  jobsList: Jobs[];
  dataSource = new MatTableDataSource<Jobs>(this.jobsList);
  userId = sessionStorage.getItem(USER_ID);
  constructor(private retrieveData: RetrieveDataService, private router: Router, private jobService: JobService,
              private uiService: UiService) { }

  ngOnInit() {
    this.retrieveData.retrieveJobsByUserId(this.userId).subscribe(data => {
      this.jobsList = data;
    });
  }

  onUpdate(jobId) {
    this.router.navigate(['job', jobId]);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete ' + name)) {
      this.jobService.deleteJob(id).subscribe(data => {
        this.retrieveData.retrieveJobsByUserId(this.userId).subscribe(retrievedData => {
          this.jobsList = retrievedData;
        });
      });

      this.uiService.showSnackBar('Record successfully deleted', null, 4000);
    }
  }

  onAddJob() {
    this.router.navigate(['job', 0]);
  }


}
