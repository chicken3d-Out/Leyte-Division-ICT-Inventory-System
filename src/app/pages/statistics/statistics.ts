import { ChangeDetectorRef, Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { BarElement, BarController, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import {MatTabsModule} from '@angular/material/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormControl} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Register everything from Chart.js
import { Equipments } from '../../services/equipments';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Schoolservice } from '../../services/schoolservice';
import { FormsModule } from '@angular/forms'; 
Chart.register(...registerables,BarElement, BarController, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);



@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,BaseChartDirective, MatIconModule, MatTabsModule, MatFormFieldModule,
    MatInputModule,MatLabel, MatError, MatButtonModule,CommonModule,MatProgressBarModule,
    ReactiveFormsModule, FormsModule, MatSelectModule,
    MatFormFieldModule, MatRadioModule,MatRippleModule,MatProgressSpinnerModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})


export class Statistics implements OnInit, OnDestroy {

  loading=true;

  schoolName:any;
  schoolID:any
  totalEquipments:any
  statusStats: any = {};

  functionalCount = 0
  repairCount = 0
  condemnCount = 0
  nonfunctionalCount = 0
  academicTotal = 0;
  administrativeTotal = 0;


 //LEYTE DIVISION STAT
  functionalCountAll = 0
  repairCountAll = 0
  condemnCountAll = 0
  nonfunctionalCountAll = 0
  academicTotalAll = 0;
  administrativeTotalAll = 0;

  doughnutOptions: any;
  barOptions: any;
  dataUnsub1!: Subscription;
  dataUnsub2!: Subscription;
  dataUnsub3!: Subscription;
  dataUnsub4!: Subscription;
  dataUnsub5!: Subscription;
  dataUnsub6!: Subscription;

  stsCount!: Subscription;
  stsCountAll!: Subscription;
  fetchSID!: Subscription;
  getAdminAcaCount!: Subscription;
  getAdminAcaCountAll!: Subscription;
  getsData!: Subscription;
  // equipStat!: Subscription;
  // equipPurpose!: Subscription;
  // getPurpDist!: Subscription;
  // equipStatDist!: Subscription;

  selectedGroup: string = ''; 
  selectedArea: string = '';
  selectedDistrict: string = '';

  areas = ['Area 1', 'Area 2-A','Area 2-B', 'Area 3', 'Area 4','Area 5-A', 'Area 5-B'];
  districts = ['ABUYOG EAST', 'ABUYOG NORTH', 'ABUYOG SOUTH', 'ABUYOG WEST',
'ALANGALANG I', 'ALANGALANG II', 'ALANGALANG III',
'ALBUERA NORTH', 'ALBUERA SOUTH',
'BABATNGON I', 'BABATNGON II',
'BARUGO I', 'BARUGO II',
'BATO EAST', 'BATO WEST',
'BURAUEN EAST', 'BURAUEN NORTH', 'BURAUEN SOUTH',
'CALUBIAN NORTH', 'CALUBIAN SOUTH',
'CAPOOCAN I', 'CAPOOCAN II',
'CARIGARA I', 'CARIGARA II', 'CARIGARA III',
'DAGAMI NORTH', 'DAGAMI SOUTH',
'DULAG NORTH', 'DULAG SOUTH', 'DULAG WEST',
'HILONGOS EAST', 'HILONGOS NORTH', 'HILONGOS SOUTH',
'HINDANG',
'INOPACAN',
'ISABEL I', 'ISABEL II',
'JARO I', 'JARO II', 'JARO III',
'JAVIER I', 'JAVIER II',
'JULITA',
'KANANGA I', 'KANANGA II', 'KANANGA III',
'LA PAZ I', 'LA PAZ II',
'LEYTE I', 'LEYTE II',
'MACARTHUR I', 'MACARTHUR II',
'MAHAPLAG I', 'MAHAPLAG II',
'MATALOM NORTH', 'MATALOM SOUTH',
'MATAG-OB',
'MAYORGA',
'MERIDA',
'PALOMPON EAST', 'PALOMPON NORTH', 'PALOMPON SOUTH',
'PALO I', 'PALO II', 'PALO III',
'PASTRANA',
'SAN ISIDRO I', 'SAN ISIDRO II',
'SAN MIGUEL',
'STA. FE',
'TABANGO NORTH', 'TABANGO SOUTH',
'TABONTABON',
'TANAUAN I', 'TANAUAN II', 'TANAUAN III',
'TOLOSA',
'TUNGA',
'VILLABA NORTH', 'VILLABA SOUTH'];

  constructor(private equipmentService: Equipments, private router: Router, private cdr: ChangeDetectorRef, private schoolService: Schoolservice){}

  schoolIDControl = new FormControl('', Validators.required);
  allSchoolIDs: string[] = [];
 
  
//CHART 1
  chartData1: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          label: 'Show/Unshow Charts',
          data: [],
          backgroundColor: ['#20784f', '#3ca075', '#79d6ae', '#1b6442'],
        },
      ],
    };

    chartOptions1: ChartOptions = {
      responsive: true,
    };

    //CHART2
    chartData2: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          label: 'Show/Unshow Charts',
          data: [],
          backgroundColor: ['#20784f', '#79d6ae','#1b6442','#20784f', '#79d6ae','#1b6442'],
        },
      ],
    };

    chartOptions2: ChartOptions = {
      responsive: true,
      
    };

    //CHART3
    chartData3: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          label: 'Show/Unshow Charts',
          data: [],
          backgroundColor: ['#20784f', '#3ca075', '#79d6ae', '#1b6442'],
        },
      ],
    };

    chartOptions3: ChartOptions = {
      responsive: true,
      
    };


    //DASHBOARD GRAPHS
    chartData4: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          label: 'Show/Unshow Charts',
          data: [],
          backgroundColor: ['#20784f', '#3ca075', '#79d6ae', '#1b6442'],
        },
      ],
    };

    chartOptions4: ChartOptions = {
      responsive: true,
    };

    //CHART2
    chartData5: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          label: 'Show/Unshow Charts',
          data: [],
          backgroundColor: ['#20784f', '#79d6ae','#1b6442','#20784f', '#79d6ae','#1b6442'],
        },
      ],
    };

    chartOptions5: ChartOptions = {
      responsive: true,
      
    };

    //CHART3
    chartData6: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          label: 'Show/Unshow Charts',
          data: [],
          backgroundColor: ['#20784f', '#3ca075', '#79d6ae', '#1b6442'],
        },
      ],
    };

    chartOptions6: ChartOptions = {
      responsive: true,
      
    };

    ngOnInit(): void {
      this.schoolID = localStorage.getItem('schoolId');

      
      this.loadChartData1();
      this.loadChartData2();
      this.loadChartData3();
      this.loadChartData4();
      this.loadChartData5();
      this.loadChartData6();

      this.statusCount();
      this.statusCountAll();

      this.fetchSchoolID();

      this.getAdminAcademicCount();
      this.getAdminAcademicCountAll()

      this.getschoolData();
      
    }

    getschoolData(){

    // this.schoolID = localStorage.getItem('schoolId');

    this.getsData = this.schoolService.getSchool(this.schoolID).subscribe(res => {
      console.log(res);
      if (res.success) {
        const data = res.data;

        this.schoolID = data.school_id;
        this.schoolName = data.school_name;

      } else {
        alert(res.message);
      }
    });
  }

    fetchSchoolID(){
      // Fetch all school IDs once on component load
    this.fetchSID = this.equipmentService.getAllSchoolIds().subscribe({
      next: (ids: string[]) => {
        this.allSchoolIDs = ids;
        // Set up validation after IDs are loaded
        this.setupValidation();
      },
      error: (err: any) => console.error('Failed to load school IDs', err),
    });
    }
    setupValidation() {
      this.schoolIDControl.valueChanges.subscribe((value) => {
        if (!value) {
          this.schoolIDControl.setErrors({ required: true });
          return;
        }

        // Check if the typed ID exists locally
        const exists = this.allSchoolIDs.includes(value.trim());
        if (!exists) {
          this.schoolIDControl.setErrors({ notFound: true });
        } else {
          this.schoolIDControl.setErrors(null);
        }
      });
    }

    onSubmit() {
      let validSchoolID = this.schoolIDControl.value || '';

      this.loading=true;


       this.getAdminAcaCount = this.equipmentService.getPurposeStats(validSchoolID).subscribe(data => {
        this.academicTotal = data.find((d: any) => d.purpose === 'Academic Use')?.total || 0;
        this.administrativeTotal = data.find((d: any) => d.purpose === 'Administrative Use')?.total || 0;
        this.loading=false;
       })

      //  this.loading=true;
      
       this.equipmentService.getStatusStats(validSchoolID).subscribe(data => {
        this.condemnCount = data.find(d => d.status === 'For Disposal')?.total || 0;
        this.repairCount = data.find(d => d.status === 'For Repair')?.total || 0;
        this.functionalCount = data.find(d => d.status === 'Functional')?.total || 0;
        this.nonfunctionalCount = data.find(d => d.status === 'Non-Functional')?.total || 0;

        // this.loading=false;
       })

       this.dataUnsub1 = this.equipmentService.getEquipmentStats(validSchoolID).subscribe(data => {
        console.log('Equipment data:', data);
        this.chartData1.labels = data.map(item => item.equipment);
        this.chartData1.datasets[0].data = data.map(item => item.total);

        // this.loading=false;

      });

      // this.loading=true;
    
      this.dataUnsub2 = this.equipmentService.getBatchStats(validSchoolID).subscribe(data => {
        console.log('Batch data:', data);
        this.chartData2.labels = data.map(item => item.batch);
        this.chartData2.datasets[0].data = data.map(item => item.total);

        // this.loading=false;

      });

      // this.loading=true;
    
      this.dataUnsub3 = this.equipmentService.getFundSourceStats(validSchoolID).subscribe(data => {
        console.log('Funds data:', data);
        this.chartData3.labels = data.map(item => item.fundsource);
        this.chartData3.datasets[0].data = data.map(item => item.total);

        // this.loading=false;

      });

      this.loading=false;

    }

     ngOnDestroy(): void {
      console.log('Dashboard destroyed!');
      // Always unsubscribe to prevent memory leaks
      this.dataUnsub1.unsubscribe();
      this.dataUnsub2.unsubscribe();
      this.dataUnsub3.unsubscribe();
      this.dataUnsub4.unsubscribe();
      this.dataUnsub5.unsubscribe();
      this.dataUnsub6.unsubscribe();

      // this.stsCount.unsubscribe();
      // this.stsCountAll.unsubscribe();
      // this.fetchSID.unsubscribe();
      // this.getAdminAcaCount.unsubscribe();
      // this.getAdminAcaCountAll.unsubscribe();
      // this.getsData.unsubscribe();
    }

    loadChartData1() {
      this.loading=true;
    
      this.dataUnsub1 = this.equipmentService.getEquipmentStats(this.schoolID).subscribe(data => {
        console.log('Equipment data:', data);
        this.chartData1.labels = data.map(item => item.equipment);
        this.chartData1.datasets[0].data = data.map(item => item.total);

        this.loading=false;

      });
    }
    loadChartData2() {
      this.loading=true;
    
      this.dataUnsub2 = this.equipmentService.getBatchStats(this.schoolID).subscribe(data => {
        console.log('Batch data:', data);
        this.chartData2.labels = data.map(item => item.batch);
        this.chartData2.datasets[0].data = data.map(item => item.total);

        this.loading=false;

      });
    }

    loadChartData3() {
      this.loading=true;
    
      this.dataUnsub3 = this.equipmentService.getFundSourceStats(this.schoolID).subscribe(data => {
        console.log('Funds data:', data);
        this.chartData3.labels = data.map(item => item.fundsource);
        this.chartData3.datasets[0].data = data.map(item => item.total);

        this.loading=false;

      });
    }


    //DASHBOARD STAT
    loadChartData4() {
      this.loading=true;
    
      this.dataUnsub4 = this.equipmentService.getEquipmentStatsAll().subscribe(data => {
        console.log('Equipment data:', data);
        this.chartData4.labels = data.map(item => item.equipment);
        this.chartData4.datasets[0].data = data.map(item => item.total);
        this.loading=false

      });
    }
    loadChartData5() {
      this.loading=true;
    
      this.dataUnsub5 = this.equipmentService.getBatchStatsAll().subscribe(data => {
        console.log('Batch data:', data);
        this.chartData5.labels = data.map(item => item.batch);
        this.chartData5.datasets[0].data = data.map(item => item.total);

        this.loading=false;

      });
    }

    loadChartData6() {
      this.loading=true;
    
      this.dataUnsub6 = this.equipmentService.getFundSourceStatsAll().subscribe(data => {
        console.log('Funds data:', data);
        this.chartData6.labels = data.map(item => item.fundsource);
        this.chartData6.datasets[0].data = data.map(item => item.total);

        this.loading=false;

      });
    }

    getAdminAcademicCount(){
      this.loading=true;

       this.getAdminAcaCount = this.equipmentService.getPurposeStats(this.schoolID).subscribe(data => {
        this.academicTotal = data.find((d: any) => d.purpose === 'Academic Use')?.total || 0;
        this.administrativeTotal = data.find((d: any) => d.purpose === 'Administrative Use')?.total || 0;

        this.loading=false;
      });
    }

    getAdminAcademicCountAll(){
      this.loading=true;

       this.getAdminAcaCountAll = this.equipmentService.getPurposeStatsAll().subscribe(data => {
        this.academicTotalAll = data.find((d: any) => d.purpose === 'Academic Use')?.total || 0;
        this.administrativeTotalAll = data.find((d: any) => d.purpose === 'Administrative Use')?.total || 0;

        this.loading=false;
      });
    }

    statusCount(){
      this.loading=true;
      
       this.stsCount = this.equipmentService.getStatusStats(this.schoolID).subscribe(data => {
        this.condemnCount = data.find(d => d.status === 'For Disposal')?.total || 0;
        this.repairCount = data.find(d => d.status === 'For Repair')?.total || 0;
        this.functionalCount = data.find(d => d.status === 'Functional')?.total || 0;
        this.nonfunctionalCount = data.find(d => d.status === 'Non-Functional')?.total || 0;

        this.loading=false;

        // console.log(this.condemnCount)
        // console.log(this.repairCount)
        // console.log(this.functionalCount)
        // console.log(this.nonfunctionalCount)

        this.cdr.markForCheck(); // force Angular to detect changes
      });
    }

    statusCountAll(){
      this.loading=true;
      
       this.stsCountAll = this.equipmentService.getStatusStatsAll().subscribe(data => {
        this.condemnCountAll = data.find(d => d.status === 'For Disposal')?.total || 0;
        this.repairCountAll = data.find(d => d.status === 'For Repair')?.total || 0;
        this.functionalCountAll = data.find(d => d.status === 'Functional')?.total || 0;
        this.nonfunctionalCountAll = data.find(d => d.status === 'Non-Functional')?.total || 0;

        this.loading=false;

        this.cdr.markForCheck(); // force Angular to detect changes
      });
    }

    

    

    onSelectGroup(group: string) {
      this.selectedGroup = group;
      // Reset dropdown values when switching
      if (group === 'area') this.selectedDistrict = '';
      if (group === 'district') this.selectedArea = '';
      console.log('Selected group:', group);
    }

    onSelectInput(value: string) {

      if(this.selectedGroup === 'area'){
        this.loading=true;

        //UPPER STAT FIRST ROW
         this.equipmentService.getStatsByArea(value).subscribe(data => {
          this.condemnCountAll = data.find(d => d.status === 'For Disposal')?.total || 0;
          this.repairCountAll = data.find(d => d.status === 'For Repair')?.total || 0;
          this.functionalCountAll = data.find(d => d.status === 'Functional')?.total || 0;
          this.nonfunctionalCountAll = data.find(d => d.status === 'Non-Functional')?.total || 0;

          // this.loading=false;

          // this.cdr.markForCheck(); // force Angular to detect changes
        })

        this.equipmentService.getPurposeByArea(value).subscribe(data => {

          // this.loading=true;
          this.academicTotalAll = data.find((d: any) => d.purpose === 'Academic Use')?.total || 0;
          this.administrativeTotalAll = data.find((d: any) => d.purpose === 'Administrative Use')?.total || 0;

          // this.loading=false;
        });

        //EQUIPMENT TYPE

        this.equipmentService.getEquipmentByArea(value).subscribe(data => {

          // this.loading=true;
          this.chartData4.labels = data.map(item => item.equipment);
          this.chartData4.datasets[0].data = data.map(item => item.total);

          // this.loading=false;

        });


        this.equipmentService.getDcpBatchByArea(value).subscribe(data => {
          // this.loading=true;
          // console.log('Batch data:', data);
          this.chartData5.labels = data.map(item => item.batch);
          this.chartData5.datasets[0].data = data.map(item => item.total);
          // this.loading=false;

        });

        this.equipmentService.getFundSourceByArea(value).subscribe(data => {

          // this.loading=true;
          // console.log('Funds data:', data);
          this.chartData6.labels = data.map(item => item.fundsource);
          this.chartData6.datasets[0].data = data.map(item => item.total);

          // this.loading=false;

        });
        this.loading = false;

        


        

      }else if (this.selectedGroup === 'district'){

        this.loading=true;
        //UPPER STAT FIRST ROW
        this.equipmentService.getStatsByDistrict(value).subscribe(data => {
          this.condemnCountAll = data.find(d => d.status === 'For Disposal')?.total || 0;
          this.repairCountAll = data.find(d => d.status === 'For Repair')?.total || 0;
          this.functionalCountAll = data.find(d => d.status === 'Functional')?.total || 0;
          this.nonfunctionalCountAll = data.find(d => d.status === 'Non-Functional')?.total || 0;

          // this.loading=false;

          // this.cdr.markForCheck(); // force Angular to detect changes
        })

        this.equipmentService.getPurposeByDistrict(value).subscribe(data => {

          // this.loading=true;
          this.academicTotalAll = data.find((d: any) => d.purpose === 'Academic Use')?.total || 0;
          this.administrativeTotalAll = data.find((d: any) => d.purpose === 'Administrative Use')?.total || 0;

          // this.loading=false;
        });


        //GET EQUIPMENT TYPE BY DISTRICT
        this.equipmentService.getEquipmentByDistrict(value).subscribe(data => {
          // this.loading=true;
          this.chartData4.labels = data.map(item => item.equipment);
          this.chartData4.datasets[0].data = data.map(item => item.total);
          // this.loading=false;

        });


        this.equipmentService.getDcpBatchByDistrict(value).subscribe(data => {

          // this.loading=true;
          
          this.chartData5.labels = data.map(item => item.batch);
          this.chartData5.datasets[0].data = data.map(item => item.total);

          // this.loading=false;

        });


        this.equipmentService.getFundSourceByDistrict(value).subscribe(data => {

          // this.loading=true;
          console.log('Funds data:', data);
          this.chartData6.labels = data.map(item => item.fundsource);
          this.chartData6.datasets[0].data = data.map(item => item.total);
          // this.loading=false;
        });

        this.loading =false;

      }
      console.log('Selected option:', value);
    }

}
