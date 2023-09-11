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

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login?' + new URLSearchParams(userDetails), {}).pipe(
      catchError(this.handleError)
    )
  }
  // The following code will make the api calls to the end points
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  getOneDirector(directorName: string): Observable<any>{
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies/director/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  getOneGenre(genreName: string): Observable<any>{
    const token = localStorage.getItem('token')
    return this.http.get(apiUrl + 'movies/genres;' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  getOneUser(): Observable<any> {
    const username = localStorage.getItem('user') || '';
    const token = localStorage.getItem('token');
    const fixUser = username.replace(/['"]+/g, '') //added to remove the quotes from local storage because it was adding quotes
    return this.http.get(apiUrl + "users/" + fixUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "users/" + user.Username, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(
				map(this.extractResponseData),
				map((data) => data.FavoriteMovies),
				catchError(this.handleError)
			);
	}

  addFavoriteMovie(movieId: string): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		user.FavoriteMovies.push(movieId);
		localStorage.setItem("user", JSON.stringify(user));
		return this.http
			.post(
				apiUrl + "users/" + user.Username + "/movies/" + movieId,
				{},
				{
					headers: new HttpHeaders({
						Authorization: "Bearer " + token,
					}),
					responseType: "text",
				}
			)
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	isFavoriteMovie(movieId: string): boolean {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		return user.FavoriteMovies.indexOf(movieId) >= 0;
	}

  deleteFavoriteMovie(movieId: string): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");

		const index = user.FavoriteMovies.indexOf(movieId);
		console.log(index);
		if (index > -1) {
			user.FavoriteMovies.splice(index, 1);
		}
		localStorage.setItem("user", JSON.stringify(user));
		return this.http
			.delete(apiUrl + "users/" + user.Username + "/movies/" + movieId, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
				responseType: "text",
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}


  editUser(updateUser: any): Observable<any>{
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    return this.http.put(apiUrl + 'users/' + `${user}`, updateUser, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    return this.http.delete(apiUrl + 'users/' + user._id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
  }
  // end code for the api endpoints
  private extractResponseData(res: Object): any {
    const body = res;
    return body || { }
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
