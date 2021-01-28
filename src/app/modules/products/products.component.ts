import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  slides = [
    {image: 'assets/images/image1.jpg'},
    {image: 'assets/images/image2.jpg'},
    {image: 'assets/images/image3.jpg'},
    {image: 'assets/images/image4.jpg'},
    {image: 'assets/images/cover1.jpg'},
    {image: 'assets/images/cover2.jpg'},
    {image: 'assets/images/cover3.jpg'}];

  items = [
      {image: 'assets/images/items/12.jpg'},
      {image: 'assets/images/items/13.jpg'},
      {image: 'assets/images/items/14.jpg'},
      {image: 'assets/images/items/15.jpg'},
      {image: 'assets/images/items/12.jpg'},
      {image: 'assets/images/items/13.jpg'},
      {image: 'assets/images/items/14.jpg'},
      {image: 'assets/images/items/15.jpg'},
      {image: 'assets/images/items/12.jpg'},
      {image: 'assets/images/items/13.jpg'},
      {image: 'assets/images/items/14.jpg'},
      {image: 'assets/images/items/15.jpg'},
    ];

  topVal = 0;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  sideBarOpen = true;
  constructor(public mediaObserver: MediaObserver) { }

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
  ngOnDestroy(): void {
  }

}
