import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Default components
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './modules/home/home.component';
import { ProductsComponent } from './modules/products/products.component';
import { ProductDetailsComponent } from './modules/products/product-details/product-details.component';
import { ProductAddComponent } from './modules/products/product-add/product-add.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ManageComponent } from './layouts/manage/manage.component';
import { ProductsAdminComponent } from './modules/admin/products-admin/products-admin.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
      children: [{
          path: '',
          component: HomeComponent
        },
        {
          path: 'shop',
          component: ProductsComponent
        },
        {
          path: 'product/add',
          component: ProductAddComponent
        },
        {
          path: 'product/:id',
          component: ProductDetailsComponent
        },
        {
          path: 'product/:id/edit',
          component: ProductAddComponent
        }]
  },
  {
    path: 'user',
    component: AuthComponent,
      children: [{
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        }]
  },
  {
    path: 'manage/admin',
    component: ManageComponent,
      children: [{
          path: '',
          component: DashboardComponent
        },
        {
          path: 'products',
          component: ProductsAdminComponent
        }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
