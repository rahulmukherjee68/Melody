import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize, mergeAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> 
  {
    let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return this.http.get(`${this.url}getAll`, { headers: headers});
  }

}
