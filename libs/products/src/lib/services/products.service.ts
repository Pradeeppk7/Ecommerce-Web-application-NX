import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLCatgories = environment.apiURL + 'products';
  constructor(private http: HttpClient) { }
  
  getProducts(): Observable <Product[]> {
    return this.http.get<Product[]>(this.apiURLCatgories)
  }
//   getCategory(categoryId:string): Observable <Category> {
//     return this.http.get<Category>(`${this.apiURLCatgories}/${categoryId}`);
//   }
//   createCategory(category: Category):Observable <Category>{
//     return this.http.post<Category>(this.apiURLCatgories, category);
//   }
//   updateCategory(category: Category):Observable <Category>{
//     return this.http.put<Category>(`${this.apiURLCatgories}/${category.id}`, category);
//   }
//   deleteCategory(categoryId: string): Observable<any>{
//     return this.http.delete<any>(`${this.apiURLCatgories}/${categoryId}`)
//   }
}
