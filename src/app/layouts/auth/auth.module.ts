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
import { SharedModule } from 'src/app/shared/ecommerce/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App Services
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';

// Default Components
import { AuthComponent } from './auth.component';
// Child Components
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
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
export class AuthModule { }
