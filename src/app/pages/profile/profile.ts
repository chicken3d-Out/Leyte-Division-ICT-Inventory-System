import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Schoolservice } from '../../services/schoolservice';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements AfterViewInit {

  schoolForm!: FormGroup;
  selectedFile!: File;
  previewUrl: any = null;
  schoolID: any;
  private baseUrl = 'http://localhost/inventory-api';

  

  constructor(private fb: FormBuilder, private schoolService: Schoolservice, private route: ActivatedRoute, private snackBar: MatSnackBar
    , private router: Router
  ) {}


  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }


  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  
  

  validation(){
    this.schoolForm = this.fb.group({

      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)]),
      school_id: new FormControl(null,[Validators.required]),
      school_name: new FormControl(null,[Validators.required]),
      school_head: new FormControl(null,[Validators.required]),
      ict_coordinator: new FormControl(null,[Validators.required]),
      area: new FormControl(null,[Validators.required]),
      district: new FormControl(null,[Validators.required]),
      number_of_teachers: new FormControl(null,[Validators.required, Validators.minLength(0)]),
      number_of_non_teaching_personnel: new FormControl(null,[Validators.required, Validators.minLength(0)]),
      school_logo: new FormControl(null,[Validators.required])

    })
  }

  get username(){
    return this.schoolForm.get('username');
  }
  get password(){
    return this.schoolForm.get('password');
  }
  get school_id(){
    return this.schoolForm.get('school_id');
  }
  get school_name(){
    return this.schoolForm.get('school_name');
  }
  get school_head(){
    return this.schoolForm.get('school_head');
  }
  get ict_coordinator(){
    return this.schoolForm.get('ict_coordinator');
  }
  get area(){
    return this.schoolForm.get('area');
  }
   get district(){
    return this.schoolForm.get('district');
  }
   get number_of_teachers(){
    return this.schoolForm.get('number_of_teachers');
  }
  get number_of_non_teaching_personnel(){
    return this.schoolForm.get('number_of_non_teaching_personnel');
  }
  get school_logo(){
    return this.schoolForm.get('school_logo');
  }


  ngOnInit(): void {
    this.validation();

    this.getschoolData();
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      // validate type
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Only JPG and PNG allowed!');
        return;
      }

      // validate size (2MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File must be under 10MB!');
        return;
      }

      this.selectedFile = file;

      // preview
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  getschoolData(){
    // Example: schoolId comes from login/session/route
  // this.schoolID = Number(localStorage.getItem('schoolId'));
  this.schoolID = localStorage.getItem('schoolId');

  this.schoolService.getSchool(this.schoolID).subscribe(res => {
    console.log(res);
    if (res.success) {
      const data = res.data;
      
      // Patch values to form (except logo)
      this.schoolForm.patchValue({
        username: data.username,
        password: data.password,
        school_id: data.school_id,
        school_name: data.school_name,
        school_head: data.school_head,
        ict_coordinator: data.ict_coordinator,
        area: data.area,
        district: data.district,
        number_of_teachers: data.number_of_teachers,
        number_of_non_teaching_personnel: data.number_of_non_teaching_personnel
      });

      // Preview logo if exists
      if (data.school_logo) {
        this.previewUrl = `${this.baseUrl}/${data.school_logo}`;
      }
    } else {
      alert(res.message);
    }
  });
  }



  onSubmit(data:any): void {

    this.schoolID = localStorage.getItem('schoolId');

    const formData = new FormData();

    // add all form fields
    Object.keys(this.schoolForm.value).forEach(key => {
      formData.append(key, this.schoolForm.value[key]);
    });

    // add file if exists
    if (this.selectedFile) {
      formData.append('school_logo', this.selectedFile, this.selectedFile.name);
    }

    console.log(formData)

    this.schoolService.updateSchool(this.schoolID, formData).subscribe(res => {
    console.log(res)


    this.snackBar.open('Profile updated successfully!', 'Close', {
              duration: 4000,              // auto close after 3s
              horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
              verticalPosition: 'bottom',      // 'top' | 'bottom'
            });

            

            window.location.reload();
            

  });

  }

}
