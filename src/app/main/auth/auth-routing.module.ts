import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login-form/login.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'user-form', component:UserFormComponent},
    {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
