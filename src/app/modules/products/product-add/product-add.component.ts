import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {

  id = 0;
  product = {
    title: '',
    description: '',
    price: 0,
    image: 'https://via.placeholder.com/150',
    avg_rating: 0,
    no_of_ratings: 0
  };

  topVal = 0;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  sideBarOpen = false;
  productForm!: FormGroup;
  constructor(public mediaObserver: MediaObserver,
              private apiService: ApiService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService)
              {
                this.productForm = this.formBuilder.group({
                  title: [null, Validators.required]
                });
               }

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
    const prToken = this.cookieService.get('pr-token');
    if (!prToken) {
      this.router.navigate(['/user/login']);
    }
  }
  ngOnDestroy(): void {
  }

  onSubmit(): void {
    console.log(this.product);
    this.apiService.createProduct(this.product.title, this.product.price, this.product.description, this.product.image).subscribe(
      (results: any) => console.log(results),
      (error: any) => console.log(error)
    );
  }

}
