import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  id = 0;
  product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    image: '',
    avg_rating: 0,
    no_of_ratings: 0
  };
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
  sideBarOpen = false;
  constructor(public mediaObserver: MediaObserver,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute) { }

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

      // Get id from url
    this.id = this.route.snapshot.params.id;
    this.product = this.apiService.getProduct(this.id).subscribe(
      (data: any) => {
        this.product = data;
      },
      (error: any) => console.log(error));

    console.log(this.product);
  }
  ngOnDestroy(): void {
  }

}
