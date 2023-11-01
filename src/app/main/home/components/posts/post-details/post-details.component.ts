import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, map, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/interfaces/posts.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  public post!: Post;
  public lastDateComment?: Date;
  private subscriptions: Subscription[]=[]

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log('construyo')
  }

  ngOnInit(): void {
   this.paramId()
  }

  private paramId():void{
    this.subscriptions.push(
      this.activatedRoute.params.pipe(
        tap(console.log),
        map(({id})=>this.postService.getPostById(id)),
        catchError((err)=>{
          throw new Error(err)
        }),
      tap(console.log))
    .subscribe({
      next: (res) => this.post = res,
      error:(err)=>this.router.navigate(['/404'])
    }))
  }

  getId():string|null {
    if(!this.post.id) return null;
    return this.post.id
  }

  reciveDate(date:Date):void{
    this.lastDateComment=date;
  }

}
