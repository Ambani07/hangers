import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  slides = [
    {image: 'assets/images/image1.jpg'},
    {image: 'assets/images/image2.jpg'},
    {image: 'assets/images/image3.jpg'},
    {image: 'assets/images/image4.jpg'},
    {image: 'assets/images/cover1.jpg'},
    {image: 'assets/images/cover2.jpg'},
    {image: 'assets/images/cover3.jpg'}];

  products: Product[] = [];

  topVal = 0;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  sideBarOpen = true;
  constructor(public mediaObserver: MediaObserver,
              public apiService: ApiService) { }

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

    this.apiService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => console.log(error));
  }
  ngOnDestroy(): void {
  }

}
