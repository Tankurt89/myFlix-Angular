import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Router } from '@angular/router';
import { ModirectorDetialsComponent } from '../modirector-detials/modirector-detials.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Name: movie.Genre.Name,
        Description: movie.Genre.Description,
      }
    })
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Name: "Description",
        Description: movie.Description,
      }
    })
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(ModirectorDetialsComponent, {
      data: {
        Name: movie.Director.Name,
        Description: movie.Director.Bio,
        Birth: movie.Director.Birth,
        Death: movie
      }
    })
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }

  addFavorite(movie: string): void {
    console.log(movie)
    this.fetchApiData.addFavoriteMovie(movie).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }
}