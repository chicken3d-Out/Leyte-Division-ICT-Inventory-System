import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChangeDetectionStrategy, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, ViewportScroller } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Equipments } from '../../services/equipments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-inventory',
  imports: [MatCardModule, MatExpansionModule,MatFormFieldModule,MatButtonModule,MatDatepickerModule,MatIconModule,MatInputModule, CommonModule, ReactiveFormsModule
    ,MatTableModule, MatPaginatorModule,MatSortModule, RouterModule, MatOptionModule, MatAutocompleteModule, MatDatepickerModule
   ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements AfterViewInit {
  Add!:FormGroup
  equipmentId!: number;
  isEditMode = false;
  equipments: string[] = ['Laptop', 'Desktop Computer', 'Printer', 'Router'];
  batches: string[] = ['DCP 2021', 'DCP 2022', 'DCP 2023', 'DCP 2024'];
  sourcef: string[] = ['DCP', 'Non-DCP', 'SEF','PTA','Others'];
  statusf: string[] = ['Functional', 'For Repair', 'For Condemn'];

  schoolID: any;


  displayedColumns: string[] = ['equipment', 'serialnum', 'owner', 'status', 'batch', 'fundsource', 'remarks','dateR', 'created_at', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;

  constructor(private fb: FormBuilder, private equipment: Equipments, private snackBar: MatSnackBar, private route: ActivatedRoute, private router:Router,
    private viewport: ViewportScroller
  ) { }

  //Form Validation
  validation(){
    this.Add = this.fb.group({
      equipment: new FormControl(null,[Validators.required]),
      serialnum: new FormControl(null,[Validators.required]),
      batch: new FormControl(null,[Validators.required]),
      fundsource: new FormControl(null,[Validators.required]),
      remarks: new FormControl(null,[Validators.required]),
      // serialnum: new FormControl(null, [Validators.required,
      //   Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
      //   Validators.maxLength(11),
      //   Validators.minLength(11)
      // ]),
      owner: new FormControl(null,[Validators.required]),
      status: new FormControl(null,[Validators.required]),
      dateR: new FormControl(null,[Validators.required])
    })
  }

   get equip(){
    return this.Add.get('equipment');
  }
  get serialnum(){
    return this.Add.get('serialnum');
  }
  get owner(){
    return this.Add.get('owner');
  }
  get status(){
    return this.Add.get('status');
  }
  get batch(){
    return this.Add.get('batch');
  }
  get fundsource(){
    return this.Add.get('fundsource');
  }
  get dateR(){
    return this.Add.get('dateR');
  }
   get remarks(){
    return this.Add.get('remarks');
  }

  resetForm(){
    this.Add.reset();
  }

  getallData(){
    this.equipment.getEquipments().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit(): void {
    this.validation();

    this.getallData();
  }
  onAdd(){
    this.isEditMode =false;
    this.resetForm();

  }
  

  onEdit(id:any): void{
    // this.equipmentId = Number(this.route.snapshot.paramMap.get('id'));

      this.isEditMode = true;  // switch to edit mode

      this.equipment.getEquipmentById(id).subscribe(data => {


      this.equipmentId = data.id;
      this.Add.patchValue(data);
      this.panel.open();

    });
  }

  scrollTo(id: string, event?: Event) {
    if (event) event.preventDefault();           // stop router/navigation
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);  // optional: update URL fragment without navigation
    } else {
      console.warn('Element not found:', id);
    }
  }



  deleteConfirm(id:any){

  }


  isOpen = true;
  // readonly panelOpenState = signal(true);

  onSubmit(data: any){

    const insertEquip = {
      equipment: data.equipment,
      serialnum: data.serialnum,
      owner: data.owner,
      status: data.status,
      batch: data.batch,
      fundsource: data.fundsource,
      remarks: data.remarks,
      dateR: data.dateR,
      station_id : String(this.schoolID = localStorage.getItem('schoolId'))
      
    };

    console.log(insertEquip);


      this.equipment.addEquipment(insertEquip).subscribe(response => {
            console.log("Server response:", response);

            this.snackBar.open('Data inserted successfully!', 'Close', {
              duration: 4000,              // auto close after 3s
              horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
              verticalPosition: 'bottom',      // 'top' | 'bottom'
            });

            this.resetForm();
            this.getallData();
            this.panel.close();
      },
      error => {
            console.error("Error:", error);
          }
      );
  }

  saveEdit(data:any){
    
    console.log(this.equipmentId);

    const equipData = {
      id: this.equipmentId,
      equipment : data.equipment,
      serialnum: data.serialnum,
      batch: data.batch,
      fundsource: data.fundsource,
      owner: data.owner,
      status: data.status,
      dateR: data.dateR,
      remarks: data.remarks,

    }

    console.log(equipData);

      this.equipment.updateEquipment(equipData).subscribe(response => {
            console.log("Server response:", response);

            this.snackBar.open('Data updated successfully!', 'Close', {
              duration: 4000,              // auto close after 3s
              horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
              verticalPosition: 'bottom',      // 'top' | 'bottom'
            });

            this.resetForm();
            this.getallData();
            this.panel.close();
      },
      error => {
            console.error("Error:", error);
          }
      );

  }


  saveData(data:any){
    if(this.isEditMode){
      this.saveEdit(data);


    }else {
      this.onSubmit(data);

    }
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
