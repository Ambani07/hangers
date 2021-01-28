import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './models/Product';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseProductUrl = `${this.baseUrl}api/products/`;
  token = this.cookieService.get('pr-token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseProductUrl, {headers: this.headers});
  }

  getProduct(id: number): any {
    return this.httpClient.get(`${this.baseProductUrl}${id}/`, {headers: this.headers});
  }

  createProduct(title: string, price: number, description: string, image: string): any {
    const body = JSON.stringify({title, price, description, image, brand: 1});
    return this.httpClient.post(`${this.baseProductUrl}`, body, {headers: this.getAuthHeaders()});
  }

  loginUser(authData: any): any {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers});
  }

  registerUser(authData: any): any {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.headers});
  }

  getAuthHeaders(): any {
    const token = this.cookieService.get('pr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
