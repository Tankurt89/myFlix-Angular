import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {  UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router ){ }
  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((data) => {
      this.dialogRef.close();
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data.username))
      console.log(data.username)
      localStorage.setItem("token", data.token);
      this.snackBar.open('you\'ve been logged in', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (data) => {
      this.snackBar.open(data, 'OK', {
        duration: 2000
      });
    })
  }
}