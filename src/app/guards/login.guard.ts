import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,private auth:AuthService){}

  canActivate(): Promise<boolean> | boolean {
      if(!this.auth.getToken()){
        return true;
      }
        return this.router.navigate(['/home'])
  }

}
