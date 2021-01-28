import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id = 0;
  user = {
    username: '',
    password: ''
  };
  loginForm!: FormGroup;

  topVal = 0;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  sideBarOpen = true;

  constructor(public mediaObserver: MediaObserver,
              private apiService: ApiService,
              private cookieService: CookieService,
              private router: Router) { }

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
    const prToken = this.cookieService.get('pr-token');
    if (prToken) {
      this.router.navigate(['/manage/admin']);
    }
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      });
  }

  onSubmit(): void {
    this.apiService.loginUser(this.user).subscribe(
      (result: TokenObj) => {
        console.log(result);
        this.cookieService.set('pr-token', result.token);
        this.router.navigate(['/manage/admin']);
      },
      (error: any) => alert(error)
    );
    console.log('Login user === ', this.user);
  }

}
