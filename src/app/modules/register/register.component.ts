import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  id = 0;
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  registerForm!: FormGroup;
  topVal = 0;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  sideBarOpen = true;
  constructor(public mediaObserver: MediaObserver,
              private apiService: ApiService,
              private router: Router,
              private cookieService: CookieService) { }

  onScroll(e: any): void {
    const scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll(): number {
    const e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }

  sideBarToggle(): boolean {
    return false;
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      });
  }

  onSubmit(): void {
    this.apiService.registerUser({username: this.user.username, password: this.user.password, email: this.user.email}).subscribe(
      (result: TokenObj) => {
        console.log(result);
        this.loginUser();
      },
      (error: any) => alert(error)
    );
  }

  loginUser(): void {
    const loginUser = {
      username: this.user.username,
      password: this.user.password
    };

    this.apiService.loginUser(loginUser).subscribe(
      (result: TokenObj) => {
        console.log(result);
        this.cookieService.set('pr-token', result.token);
        this.router.navigate(['/product/add']);
      },
      (error: any) => alert(error)
    );
  }

}
