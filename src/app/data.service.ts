import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get('https://fakestoreapi.com/products?limit=10')
  }
}
