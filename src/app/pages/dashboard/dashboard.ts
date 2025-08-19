import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatIconModule,MatSidenavModule, MatToolbarModule, MatMenuModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  showFiller = false;

}
