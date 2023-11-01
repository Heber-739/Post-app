import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/interfaces/loginUser.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  public loginForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private authService:AuthService) {}


  ngOnInit(): void {
    this.initForm()
  }

  private initForm():void{
    this.loginForm = this.fb.group({
      mail:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit():void{
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user:LoginUser = this.loginForm.value
      this.authService.loginfire(user)
  }
}
