import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/posts.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  public post: Post | null = null;
  public lastDateComment?: Date;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.paramId()
  }

  private paramId():void{
    const id = this.router.url.split('/').pop()
    this.postService.getPostById(id!).then((post)=>{
      if(post){
        this.post = post
      }else {
        this.router.navigate(['/404'])
      }
    })
  }

  reciveDate(date:Date):void{
    this.lastDateComment=date;
  }

}
