import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../services/authentication';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,MatCardModule,FormsModule, MatToolbarModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private auth:Authentication, private router:Router, private snackBar: MatSnackBar){}

  username: string = '';
  password: string = '';
  logoUrl = 'https://ldiis.depedleytedivision.com/uploads/depedleytedivisionlogo10162025.png';


  login() {
    this.auth.login(this.username, this.password).subscribe(
      (res) => {
        if (res.success) {
          const schoolId = res.school_id;

          // Option A: Pass via route
          this.router.navigate(['/statistics']);
          localStorage.setItem('schoolId', `${schoolId}`);
          localStorage.setItem('watson', `${schoolId}`);

          this.snackBar.open('Login successfully!', 'Close', {
              duration: 4000,              // auto close after 3s
              horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
              verticalPosition: 'bottom',      // 'top' | 'bottom'
            });

        } else {
          alert(res.message);
        }
      },
      (err) => {
        console.error(err);
        alert('Server error');
      }
    );
  }

}
