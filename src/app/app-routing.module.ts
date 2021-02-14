import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './pages/login/login.component';
import { GetEmailChangePasswordComponent } from './pages/get-email-change-password/get-email-change-password.component';
import { VerifyOtpChangePasswordComponent } from './pages/verify-otp-change-password/verify-otp-change-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'get-contact-change-password',
    loadChildren: () => import('./pages/get-email-change-password/get-email-change-password.module').then(m => m.GetEmailChangePasswordModule)
  },
  {
    path:'verify-otp-change-password',
    loadChildren: () => import('./pages/verify-otp-change-password/verify-otp-change-password.module').then(m => m.VerifyOtpChangePasswordModule)
  },
  {
    path:'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule)
  },
  {
    path: 'sidenav',
    component: SidenavComponent,
    children:[
      {
        path: '',
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./pages/stock/stock.module').then(m => m.StockModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path:'banners',
        loadChildren: () => import('./pages/banners/banners.module').then(m => m.BannersModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./pages/stores/stores.module').then(m => m.StoresModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'delivery-agents',
        loadChildren: () => import('./pages/delivery-agents/delivery-agents.module').then(m => m.DeliveryAgentsModule)
      },
      {
        path: 'advertising-services',
        loadChildren: () => import('./pages/advertising-services/advertising-services.module').then(m => m.AdvertisingServicesModule)
      },
      {
        path: 'subadmins',
        loadChildren: () => import('./pages/subadmins/subadmins.module').then(m => m.SubadminsModule)
      },
      {
        path: 'suppliers',
        loadChildren: () => import('./pages/suppliers/suppliers.module').then(m => m.SuppliersModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'returns',
        loadChildren: () => import('./pages/returns/returns.module').then(m => m.ReturnsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
