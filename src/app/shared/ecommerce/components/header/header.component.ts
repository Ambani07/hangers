import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Input() deviceXs!: boolean;
  authorized = false;

  constructor(private cookieService: CookieService,
              private router: Router) {
    const token = this.cookieService.get('pr-token');
    if (token) {
      this.authorized = true;
    }
   }

  ngOnInit(): void {
  }

  toggleSideBar(): void {
    this.toggleSidebarForMe.emit();
  }

  logout(): void  {
    this.cookieService.delete('pr-token');
    this.router.navigate(['/user/login']);
  }

}
