import { Component } from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  Router
} from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  /*
   Logs out current user and redirects to login page.
  */
  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}
