import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ToggleWordPipe } from 'src/app/pipes/toggle-word.pipe';
import { UserComponent } from './components/user/user.component';
import { CommentFormComponent } from './components/posts/comment-form/comment-form.component';
import { CommentsComponent } from './components/posts/comments/comments.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details.component';
import { PostFormComponent } from './components/posts/post-form/post-form.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostDetailsComponent,
    CommentsComponent,
    ToggleWordPipe,
    CommentFormComponent,
    UserComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class HomeModule { }
