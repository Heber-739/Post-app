import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';

const routes: Routes = [
    {path:'posts',component:PostListComponent},
    {path:'post/:id',component:PostDetailsComponent},
    {path:'user',component:UserComponent},
    {path:'**', redirectTo:'posts'}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
