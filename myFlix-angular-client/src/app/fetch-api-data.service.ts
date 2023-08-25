import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';

const apiUrl = 'https://agile-beach-16603.herokuapp.com/' 
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {

  constructor(private http: HttpClient) { 

  }
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message)
    } else{
      console.error(
        `Error Status code ${error.status},` +
        `Error body is: ${error.error}`)
    }
    return throwError(
      'Something bad happened; please try again later.')
  }
}
