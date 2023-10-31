import { FireUser } from 'src/app/interfaces/user.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post, State } from 'src/app/interfaces/posts.interface';

@Component({
  selector: 'app-post-list-home',
  templateUrl: './post-list-home.component.html',
  styleUrls: ['./post-list-home.component.css']
})
export class PostListHomeComponent implements OnInit {
  public titles:string[]=['id','description','Actions'];
  newPost:boolean = false;
  private user!:FireUser;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource!:MatTableDataSource<Post>;

  private subscriptions:Subscription[]=[]

  constructor(
    private router:Router,
    private auth:AuthService,
    private postService: PostService) {}

  ngOnInit(): void {
    this.getUser()
   this.getPosts()
  }

  private getUser(){
    this.subscriptions.push(
  this.auth.getUser().subscribe(res => this.user = res))
  }

  private getPosts():void{
    this.postService.getPosts().then((posts)=> {
      this.dataSource = new MatTableDataSource<Post>(posts),
    this.dataSource!.paginator = this.paginator
    })

  }

  createPost(post:any){
      const {username,uid,imageUrl} = this.user;
      const newPost: Post = {
        state:State.PUBLIC ,
        author:{username,uid,imageUrl},
        ...post
      }
      this.postService.addPost(newPost)
  }

}
