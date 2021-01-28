import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {

  sideBarOpen = true;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      });
  }

  ngOnDestroy(): void {
  }

  toggleSideBar(event: any): void {
    console.log('event');
    this.sideBarOpen = !this.sideBarOpen;
  }

}
