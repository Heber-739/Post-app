import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginUser } from 'src/app/interfaces/loginUser.interface';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscriptions:Subscription[]=[];
  public loginForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private authService:AuthService) {}


  ngOnInit(): void {
    this.initForm()
  }

    ngOnDestroy(): void {
      this.subscriptions.forEach(s=>s.unsubscribe())
  }

  private initForm(){
    this.loginForm = this.fb.group({
      mail:['Abdul@michito.com',Validators.required],
      password:['123456',Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user:LoginUser=this.loginForm.value
      this.authService.loginfire(user)
  }
}
