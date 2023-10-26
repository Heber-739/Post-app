import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/interfaces/responsePostList.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail-home',
  templateUrl: './post-detail-home.component.html',
  styleUrls: ['./post-detail-home.component.css'],
})
export class PostDetailHomeComponent implements OnInit {
  public post!: Post;
  public lastDateComment?: Date;
  private subscriptions: Subscription[]=[]

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.paramId()
  }

  private paramId():void{
    this.subscriptions.push(
      this.activatedRoute.params.pipe(
        tap(console.log),
      switchMap(({ id }) => this.postService.getPostDetail(id)),
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
