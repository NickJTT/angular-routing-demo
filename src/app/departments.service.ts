import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDepartment } from './models/department';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private readonly url: string = '/assets/mock/departments.json'; 

  constructor(private readonly http: HttpClient) {}

  public getDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(this.url).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Internal Server Error!');
  }
}
