import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Statistics } from './pages/statistics/statistics';
import { Internetcon } from './pages/internetcon/internetcon';
import { Inventory } from './pages/inventory/inventory';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/login/login';
import { authguardGuard } from './guard/authguard-guard';


export const routes: Routes = [
    {path: '', component: Dashboard, redirectTo: 'login', canActivate: [authguardGuard], children:[
        { path: '', redirectTo: 'statistics', pathMatch: 'full' },
        { path: 'statistics', component: Statistics},
        { path: 'intercon', component: Internetcon},
        { path: 'inventory', component: Inventory},
        { path: 'inventory/:id', component: Inventory},
        { path: 'profile', component: Profile},
        // { path: 'login', component: Login},
    ]},
    { path: 'login', component: Login}]
