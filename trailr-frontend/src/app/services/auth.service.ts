import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  /*
   Simple demo login authentication.
   This can later be replaced with database or JWT authentication.
  */
  login(username: string, password: string): boolean {

    // Demo credentials
    if (username === 'admin' && password === 'trailr123') {

      this.loggedIn = true;

      localStorage.setItem('loggedIn', 'true');

      return true;
    }

    return false;
  }

  /*
   Logs out the current user.
  */
  logout(): void {

    this.loggedIn = false;

    localStorage.removeItem('loggedIn');

  }

  /*
   Checks if user is authenticated.
  */
  isLoggedIn(): boolean {

    return localStorage.getItem('loggedIn') === 'true';

  }

}
