import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PostsGuard } from './guards/posts.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',loadChildren:()=>import('./main/auth/auth.module').then(m=>m.AuthModule),canActivate:[LoginGuard]},
  {path:'home',loadChildren:()=>import('./main/home/home.module').then(m=>m.HomeModule),canActivate:[PostsGuard]},
  {path:'404',component:PageNotFoundComponent},
  {path:'**', redirectTo:'404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
