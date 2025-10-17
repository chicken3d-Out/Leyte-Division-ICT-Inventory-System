import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { Schoolservice } from '../../services/schoolservice';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatIconModule,MatSidenavModule, MatToolbarModule, MatMenuModule, RouterModule, 
     MatCard, MatCardTitle, MatCardHeader
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  constructor(private schoolService:Schoolservice, private router:Router){}

  schoolID: any;
  previewUrl: any = null;
  private baseUrl = 'https://ldiis.depedleytedivision.com/ict-inventory';
  schoolName: any
  logoUrl = 'https://ldiis.depedleytedivision.com/ict-inventory/uploads/depedleytedivisionlogo10162025.png';

  ngOnInit(): void {
    this.getschoolData();
  }

  onSignOut(){
    localStorage.removeItem('watson'); // or localStorage.clear();
    localStorage.removeItem('schoolId'); // or localStorage.clear();
    this.router.navigate(['/login']);


  }

  update(){
    this.getschoolData();
  }

  getschoolData(){
    // Example: schoolId comes from login/session/route
  // this.schoolID = Number(localStorage.getItem('schoolId'));
  this.schoolID = localStorage.getItem('schoolId');

  this.schoolService.getSchool(this.schoolID).subscribe(res => {
    console.log(res);
    if (res.success) {
      const data = res.data;

      this.schoolID = data.school_id;
      this.schoolName = data.school_name;



      // Preview logo if exists
      if (data.school_logo) {

        this.previewUrl = `${this.baseUrl}/${data.school_logo}`;
      }
    } else {
      alert(res.message);
    }
  });
  }

  showFiller = false;

}
