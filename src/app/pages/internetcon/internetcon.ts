import { Component, OnInit } from '@angular/core';
import {inject} from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormsModule, ReactiveFormsModule, Form, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { Internetservice } from '../../services/internetservice';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-internetcon',
  imports: [MatStepperModule,
    FormsModule,
    ReactiveFormsModule,MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule, MatDividerModule, CommonModule,
    MatButtonModule, MatRadioModule,
    MatIconModule, MatCardModule],
  templateUrl: './internetcon.html',
  styleUrl: './internetcon.css',
  providers:[{provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}}]
})
export class Internetcon implements OnInit {

  constructor(private fb: FormBuilder, private netService:Internetservice, private dialog: MatDialog, private snackBar:MatSnackBar) {}

  internetForm!: FormGroup;
  ispForm!: FormGroup;
  cellularForm!: FormGroup;
  schoolID:any
  



  ngOnInit(): void {
    this.validation();

    this.setupExclusiveCheckboxes()

    this.patchInternetCon()
  }

  validation (){
    this.schoolID = localStorage.getItem('schoolId');


    this.internetForm = this.fb.group({
      has_isp:['no'] ,
      school_id:[`${this.schoolID}`],
      globe: [false],
      smart: [false],
      pldt: [false],
      skycable: [false],
      converge: [false],
      starlink: [false],
      eastern_comm: [false],
      dito: [false],
      others_checked:[''],
      others_provider: [''],
      school_subscribe: ['no'],
      purpose_admin: [false],
      purpose_classroom: [false],
      purpose_both: [false],
      no_subscribe_reason: [''],
      coverage_school_wide: [false],
      coverage_faculty: [false],
      coverage_principal_office: [false],
      coverage_elem_area: [false],
      coverage_jhs_area: [false],
      coverage_shs_area: [false],
      coverage_ict_lab: [false],
      coverage_library: [false],
      coverage_other_checked: [''],
      coverage_other:[''],
      rooms_admin: [0],
      rooms_classroom: [0],
      dict_free_wifi: ['no']
    });

    this.ispForm = this.fb.group({
      connectionType: ['',Validators.required],
      speed: ['',Validators.required],
      monthlyCost: ['',Validators.required]
    });

    this.cellularForm = this.fb.group({
      provider: ['',Validators.required],
      monthlyCost: ['',Validators.required]
    });
  }

  setupExclusiveCheckboxes() {
    const controls = ['purpose_admin', 'purpose_classroom', 'purpose_both'];

    controls.forEach(ctrlName => {
      this.internetForm.get(ctrlName)?.valueChanges.subscribe((checked: any) => {
        if (checked) {
          controls.forEach(otherCtrl => {
            if (otherCtrl !== ctrlName) {
              this.internetForm.get(otherCtrl)?.setValue(false, { emitEvent: false });
            }
          });
        }
      });
    });
  }

  saveStep1() {

    console.log(this.internetForm.value);
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.netService.saveInternetConnectivity(this.internetForm.value).subscribe(res => {
          console.log('Step 1 saved:', res);

            this.snackBar.open('Internet Connectivity updated successfully!', 'Close', {
                duration: 4000,              // auto close after 3s
                horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
                verticalPosition: 'bottom',      // 'top' | 'bottom'
            });
        });
      } else {
        console.log('❌ Save canceled');
      }
    });
    
  }
  patchInternetCon(){
    this.schoolID = localStorage.getItem('schoolId');

    this.netService.getLatestInternetConnectivity(this.schoolID).subscribe(res => {
      if (res.status === 'success') {
        this.internetForm.patchValue(res.data);
        console.log("Patch Success!")
      } else {
        console.error(res.message);
      }
    });

  }
  saveStep2() {
    this.netService.saveInternetService(this.ispForm.value).subscribe(res => {
      console.log('Step 2 saved:', res);
    });
  }

  saveStep3() {
    this.netService.saveCellularService(this.cellularForm.value).subscribe(res => {
      console.log('Step 3 saved:', res);
    });
  }


  

}
