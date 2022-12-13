import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../models/response";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    @Inject('endpoint') private endpoint: string,
    private http: HttpClient
  ) { }

  post(url: string, params?: object, options?: object): Observable<Response> {
    return this.http.post(`${this.endpoint}${url}`, params, options);
  }

  put(url: string, params?: object, options?: object): Observable<Response> {
    return this.http.put(`${this.endpoint}${url}`, params, options);
  }

  get(url: string, params?: any): Observable<Response> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = httpParams.appendAll(params);
    }
    return this.http.get(`${this.endpoint}${url}`, {
      params: httpParams
    });
  }

  delete(url: string): Observable<Response> {
    return this.http.delete(`${this.endpoint}${url}`);
  }

}
