import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailHomeComponent } from './components/post-details/components/post-detail-home/post-detail-home.component';
import { PostListHomeComponent } from './components/post-list/components/post-list-home/post-list-home.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
      {path:'posts',component:PostListHomeComponent},
    {path:'post/:id',component:PostDetailHomeComponent},
    {path:'user',component:UserComponent},
    {path:'**', redirectTo:'posts'}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
