import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password: string | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    if (!this.username || !this.password) {
      alert('Please enter username and password');
      return;
    }
  
    const data = {
      username: this.username,
      password: this.password
    };
  
    this.http.post('http://127.0.0.1:8000/users/login', data)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/home']);

        // handle successful login
      }, error => {
        console.error(error);
        // handle login error
      });
  }

}
