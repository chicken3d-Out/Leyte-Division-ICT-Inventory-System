import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Statistics } from './pages/statistics/statistics';
import { Internetcon } from './pages/internetcon/internetcon';
import { Inventory } from './pages/inventory/inventory';
import { Profile } from './pages/profile/profile';
import { Resources } from './pages/resources/resources';


export const routes: Routes = [
    {path: '', component: Dashboard, children:[
        { path: 'statistics', component: Statistics},
        { path: 'intercon', component: Internetcon},
        { path: 'inventory', component: Inventory},
        { path: 'inventory/:id', component: Inventory},
        { path: 'profile', component: Profile},
        { path: 'resources', component: Resources},
        { path: '#targetDiv', component: Inventory},
    ]},
];
