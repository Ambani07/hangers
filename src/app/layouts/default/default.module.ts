// App Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// UI Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SharedModule } from 'src/app/shared/ecommerce/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { ApiService } from '../../api.service';
import { CookieService } from 'ngx-cookie-service';

// Default Component
import { DefaultComponent } from './default.component';
// Child Components
import { HomeComponent } from 'src/app/modules/home/home.component';
import { ProductsComponent } from 'src/app/modules/products/products.component';
import { ProductDetailsComponent } from 'src/app/modules/products/product-details/product-details.component';
import { ProductAddComponent } from 'src/app/modules/products/product-add/product-add.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductAddComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatCarouselModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    CookieService
  ]
})
export class DefaultModule { }
