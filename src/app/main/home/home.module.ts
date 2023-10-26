import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ToggleWordPipe } from 'src/app/pipes/toggle-word.pipe';
import { CommentFormComponent } from './components/post-details/components/comment-form/comment-form.component';
import { CommentsComponent } from './components/post-details/components/comments/comments.component';
import { PostDetailHomeComponent } from './components/post-details/components/post-detail-home/post-detail-home.component';
import { PostListHomeComponent } from './components/post-list/components/post-list-home/post-list-home.component';
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PostListHomeComponent,
    PostDetailHomeComponent,
    CommentsComponent,
    ToggleWordPipe,
    CommentFormComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class HomeModule { }
