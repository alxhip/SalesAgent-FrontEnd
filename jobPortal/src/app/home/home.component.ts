import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../service/data/retrieve-data.service';
import { Jobs } from '../shared/jobs.model';
import { DecodeJWTService } from '../service/auth/decode-jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobList: Jobs[];

  constructor(private retrieveData: RetrieveDataService, private decodeJWT: DecodeJWTService) { }

  ngOnInit() {
    this.retrieveData.RetrieveAllData().subscribe(data => this.jobList = data);
    // let token=sessionStorage.getItem('token');
    // let decodedToken=this.decodeJWT.getDecodedAccessToken(token);
    // console.log(decodedToken)
    // console.log(this.decodeJWT.getUserIdJWT(decodedToken))
  }

}
