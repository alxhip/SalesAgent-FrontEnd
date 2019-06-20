import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { USER_ROLE, USER_ID } from '../app.constant';
import { UiService } from '../service/ui-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private lat = 41.327891;
  private lng = 19.817734;
  private supplierId = sessionStorage.getItem(USER_ID);

  private origin = { lat: 41.339245, lng: 19.786509 };
  private destination: any; // = { lat: 41.339245, lng: 19.786509 };
  private markerSwitch = true;
  private waypoints: object;
  private markers = [];
  private suppliers = [];
  private orderedList = [];
  private selectedData;
  private userRole = sessionStorage.getItem(USER_ROLE);
  private userId;

  // = [
  //   {
  //     location: { lat: 41.332957, lng: 19.804413 },
  //     stopover: true,
  //   }
  //   ,
  //   {
  //     location: { lat: 41.330083, lng: 19.8343 },
  //     stopover: true,
  //   }
  //   ,
  //   {
  //     location: { lat: 41.321111, lng: 19.804379 },
  //     stopover: true,
  //   }
  // ];


  // tslint:disable-next-line: max-line-length
  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private router: Router, private uiService: UiService) {
    this.userId = sessionStorage.getItem(USER_ID);

    this.activatedRoute.params.subscribe(val => {
      this.markers = [];

      // this.customerService.getSupplierByAdministrator(sessionStorage.getItem(USER_ID)).subscribe(
      //   data => {
      //     this.suppliers = data;
      //   }
      // );
      // if (this.supplierId && this.supplierId !== '0') {
      //   this.supplierId = val.supplierId;
      //   this.customerService.getClientsBySupplier(this.supplierId).subscribe(
      //     response => {
      //       this.markers = response;
      //     }
      //   );
      // } else {
      //   this.customerService.getAllClientDataByAdministrator(sessionStorage.getItem(USER_ID)).subscribe(
      //     response => {
      //       this.markers = response;
      //     }
      //   );
      // }
      if (this.userRole === 'Admin') {
        this.customerService.getSupplierByAdministrator(this.userId).subscribe(
          data => {
            this.suppliers = data;
            this.suppliers.unshift({ id: this.userId, username: 'All' });
          }
        );
      }
      // this.supplierId = val.supplierId;
      this.customerService.getClientsBySupervisor(this.supplierId).subscribe(
        data => {
          this.markers = data;
        }
      );


    });
  }

  ngOnInit() {
  }

  showClientsBySupplier(supplierId) {
    this.router.navigate(['home', supplierId]);
    this.markerSwitch = true;
  }

  showRoute() {
    if (this.selectedData === undefined) {
      this.uiService.showSnackBar('Please select your route', null, 4000);
    } else {
      this.orderedList = [];

      this.customerService.getClientsSortedAddresses(this.selectedData).subscribe(data => {
        data.forEach((item, index) => {
          if (index !== data.length - 1) {
            this.orderedList.push({
              location: { lat: +item.address.latitude, lng: +item.address.longitude },
              stopover: true,
            });
          } else {
            this.destination = {
              lat: +item.address.latitude,
              lng: +item.address.longitude

            };
            this.waypoints = this.orderedList;
          }
        });
      }
      );
      this.markerSwitch = false;
    }
  }
}
