import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Statistics } from './pages/statistics/statistics';
import { Internetcon } from './pages/internetcon/internetcon';
import { Inventory } from './pages/inventory/inventory';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/login/login';
import { authguardGuard } from './guard/authguard-guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
        path: '',
        component: Dashboard, canActivate: [authguardGuard],
        children: [
        { path: 'statistics',
            loadComponent: () =>
                import('./pages/statistics/statistics').then(m => m.Statistics)
        },
        { path: 'intercon',
            loadComponent: () =>
                import('./pages/internetcon/internetcon').then(m => m.Internetcon)
        },
        { path: 'inventory', 
            loadComponent: () =>
                import('./pages/inventory/inventory').then(m => m.Inventory)
         },
        { path: 'inventory/:id', component: Inventory },
        { path: 'profile', 
            loadComponent: () =>
                import('./pages/profile/profile').then(m => m.Profile)
        },
        ],
    },
    { path: '**', redirectTo: 'login' }, // optional fallback
    ]
