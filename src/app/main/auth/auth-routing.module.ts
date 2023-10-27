import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login-form/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
