import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import { DeleteDialog } from '../../delete-dialog/delete-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-internetcon',
  imports: [MatStepperModule,
    FormsModule, MatExpansionPanelDescription,MatExpansionModule,MatCheckboxModule, MatExpansionPanelTitle,
    MatFormFieldModule, MatSortModule,MatPaginatorModule, MatSort,MatPaginator,MatTableModule, ReactiveFormsModule,
    MatInputModule, MatDividerModule, CommonModule, MatExpansionPanel, MatOptionModule,
    MatButtonModule, MatRadioModule, MatDatepickerModule, MatAutocompleteModule, MatExpansionPanelHeader, MatProgressSpinnerModule,
    MatIconModule, MatCardModule, MatProgressBarModule],
  templateUrl: './internetcon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './internetcon.css',
  providers:[{provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false}}]
})
export class Internetcon implements AfterViewInit {

  constructor(private fb: FormBuilder, private netService:Internetservice, private dialog: MatDialog, private snackBar:MatSnackBar, private cdr: ChangeDetectorRef) {}
  
  loading = true;

  ispID:any
  internetForm!: FormGroup;
  ispForm!: FormGroup;
  cellularForm!: FormGroup;
  schoolID:any
  isEditMode = false;

  serviceofinternet: string[] = ['Globe', 'Smart', 'PLDT'];
  typeofinternet: string[] = ['Fiber', 'Satellite', 'Mobile Broadband'];
  purposeinternet: string[] = ['Administrative Use', 'Academic Use', 'Both'];
  qualityInternet: string[] = ['Strong', 'Interment', 'Poor'];
  fundSinternet: string[] = ['MOOE', 'Donation'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;

  displayedColumns: string[] = ['serviceNet', 'typeofnet','purposenet','dateTested','timeTested','ping','download','upload','quality','monthlySub','fundSnet','action'];
  dataSource = new MatTableDataSource<any>();



  ngOnInit(): void {

    this.validationISP();
    this.validation();
    this.cellularValidation();

    this.setupExclusiveCheckboxes();

    this.patchInternetCon();
    // this.patchSchoolID

    this.getallISP();

    
   
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
    })
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

  resetForm(){
    this.ispForm.reset();
  }

  resetCellForm(){
    this.cellularForm.get('school_id')?.disable();
    this.cellularForm.reset();
  }

  validationISP(){

    this.ispForm = this.fb.group({

      id: new FormControl(`${this.ispID}`),
      
      serviceNet: new FormControl('',[Validators.required]),
      school_id: new FormControl(`${this.schoolID}`), 
      typeofnet: new FormControl('',[Validators.required]),
      purposenet: new FormControl('',[Validators.required]),
      dateTested: new FormControl('',[Validators.required]),
      timeTested: new FormControl('',[Validators.required]),
      ping: new FormControl('',[Validators.required]),
      download: new FormControl('',[Validators.required]),
      upload: new FormControl('',[Validators.required]),
      quality: new FormControl('',[Validators.required]),
      monthlySub: new FormControl('',[Validators.required]),
      fundSnet: new FormControl('',[Validators.required]),

    })

  }

  //ALL FUNCTION FOR STEP 2
    get serviceNet(){
      return this.ispForm.get('serviceNet');
    }
    get typeofnet(){
      return this.ispForm.get('typeofnet');
    }
    get purposenet(){
      return this.ispForm.get('purposenet');
    }
    get dateTested(){
      return this.ispForm.get('dateTested');
    }
    get timeTested(){
      return this.ispForm.get('timeTested');
    }
    get ping(){
      return this.ispForm.get('ping');
    }
    get download(){
      return this.ispForm.get('download');
    }
    get upload(){
      return this.ispForm.get('upload');
    }
    get quality(){
      return this.ispForm.get('quality');
    }
    get monthlySub(){
      return this.ispForm.get('monthlySub');
    }
    get fundSnet(){
      return this.ispForm.get('fundSnet');
    }



    cellularValidation(){

      this.schoolID = localStorage.getItem('schoolId')


      this.cellularForm = this.fb.group({

        school_id:[`${this.schoolID}`],
        provider: new FormControl('',[Validators.required]),
        text_sms: [''],
        call_service: [''],
        send_view_images: [''],
        video_call: [''],
        no_signal: [''],
        wireless_tech: new FormControl('',[Validators.required]),
        avg_monthly_expense: new FormControl('',[Validators.required]),
        fund_source: new FormControl('',[Validators.required]),
      });
    }

    //GET ALL FUNCTION
    get provider(){
      return this.cellularForm.get('provider');
    }
    get text_sms(){
      return this.cellularForm.get('text_sms');
    }
    get call_service(){
      return this.cellularForm.get('call_service');
    }
    get send_view_images(){
      return this.cellularForm.get('send_view_images');
    }
    get video_call(){
      return this.cellularForm.get('video_call');
    }
    get no_signal(){
      return this.cellularForm.get('no_signal');
    }
    get wireless_tech(){
      return this.cellularForm.get('wireless_tech');
    }
    get avg_monthly_expense(){
      return this.cellularForm.get('avg_monthly_expense');
    }
    get fund_source(){
      return this.cellularForm.get('fund_source');
    }


  onAdd(){
    this.isEditMode =false;
    this.resetForm();

  }

  // onEdit(id:any): void{
  //   // this.equipmentId = Number(this.route.snapshot.paramMap.get('id'));

  //     this.isEditMode = true;  // switch to edit mode

  //     this.equipment.getEquipmentById(id).subscribe(data => {


  //     this.equipmentId = data.id;
  //     this.Add.patchValue(data);
  //     this.panel.open();

  //   });
  // }


  saveData(data:any){
    if(this.isEditMode){
      this.saveEdit(data);


    }else {
      this.saveStep2(data);

    }
  }

  saveEdit(data:any){


    console.log(this.ispForm.value)

    this.netService.updateISP(this.ispForm.value).subscribe({
    next: (res) => {
      console.log(res);
      this.snackBar.open('ISP Data Updated successfully!', 'Close', {
              duration: 4000,              // auto close after 3s
              horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
              verticalPosition: 'bottom',      // 'top' | 'bottom'
            });

        this.resetForm();
        this.getallISP();
        this.panel.close();
      
      
    },
    error: (err) => console.error('Error saving ISP:', err)
    });

  }

  saveStep2(data:any) {

    this.ispForm.patchValue({
      school_id: String(localStorage.getItem('schoolId'))
    });

    console.log(this.ispForm.value)


    this.netService.saveInternetService(this.ispForm.value).subscribe(res => {
      console.log('Step 2 saved:', res);

      this.snackBar.open('Data inserted successfully!', 'Close', {
              duration: 4000,              // auto close after 3s
              horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
              verticalPosition: 'bottom',      // 'top' | 'bottom'
            });

            this.resetForm();
            this.getallISP();
            this.panel.close();
    });
  }

  getallISP(){
    this.loading= true;
    this.schoolID = localStorage.getItem('schoolId');

    this.netService.getInternetService(this.schoolID).subscribe(res=>{
      this.dataSource.data = res || [];

      this.loading= false;
      this.cdr.detectChanges();
      
      console.log("Patching on Step 2 okay")
    })

  }

  //On Edit
  onEditISP(id:any): void{

      this.isEditMode = true;  // switch to edit mode
      this.panel.open();

      this.ispID = id;

      this.netService.getISPById(id).subscribe(res => {

        if (res.status === 'success') {
          this.ispForm.patchValue(res.data);   // 👈 Patch directly
        } else {
          console.error(res.message);
        }
      });

  }

  saveStep3(data:any) {

    console.log(this.cellularForm.value)
    
    this.netService.addCellularService(this.cellularForm.value).subscribe(res => {
      console.log('Step 3 saved:', res);

      this.snackBar.open('Cellular data inserted successfully!', 'Close', {
              duration: 4000,              // auto close after 3s
              horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
              verticalPosition: 'bottom',      // 'top' | 'bottom'
            });

            this.resetCellForm();
            // this.getallData();
            this.panel.close();
    });
  }

  //DELETE ROW
  deleteConfirm(id:any){
      const dialogRef = this.dialog.open(DeleteDialog, {
            width: '300px'
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.netService.deleteISP(id).subscribe(res => {
                console.log('Row Deleted', res);
      
                  this.snackBar.open('Row Deleted Successfully!', 'Close', {
                      duration: 4000,              // auto close after 3s
                      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
                      verticalPosition: 'bottom',      // 'top' | 'bottom'
                  });
                  this.getallISP();
              });
            } else {
              console.log('❌ Save canceled');
            }
          });
  
    }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  


  

}
