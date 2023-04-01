import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://localhost:8000/users/login', { username: username, password: password }, { headers: headers })
      .toPromise()
      .then(data => {
        localStorage.setItem('token', data.token);
        this.loggedInSubject.next(true);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error);
        alert('Incorrect User Details');
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }
}
