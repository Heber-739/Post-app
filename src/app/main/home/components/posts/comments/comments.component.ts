import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit,OnDestroy ,Output } from '@angular/core';
import { Comment, CreateComment, DeleteComment, UpdateComponent } from 'src/app/interfaces/comment.interface';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  public userId!:string;
  public upperLowerWord: boolean = false;
  public comments:Comment[]=[];
  public editComment:Comment|null = null;
  private subscriptions:Subscription[]=[];
  public addComment:boolean = false;

  @Input() postId:string|null = null;
  @Output() dateOutput = new EventEmitter<Date>();

  constructor(private auth:AuthService,private commentsService:CommentsService) { }

  ngOnInit(): void {
    this.getComments()
        this.getUser()
  }

    ngOnDestroy(): void {
      this.subscriptions.forEach(s=>s.unsubscribe())
    }

      private getUser(){
    this.subscriptions.push(this.auth.getUser()
    .subscribe({
      next:(res)=>this.userId = res.uid!
    }))
  }

  sendEditComment(comment:Comment){
    this.editComment = comment
  }

  private getComments():void{
    if(this.postId){
      this.subscriptions.push(
        this.commentsService.getCommentsByPostId(this.postId).subscribe({
        next:(res)=> this.comments = this.sortCommentsByDate(res)
      }))
    }
  }

  private sortCommentsByDate(comments: Comment[]): Comment[] {
  return comments.slice().sort((a, b) => b.creationDate.valueOf() - a.creationDate.valueOf()).reverse();
}

  deleteComment(id:string){
    let del:DeleteComment = {id}
    this.subscriptions.push(this.commentsService
      .deleteComment(del).subscribe({
        next:()=>this.getComments()
      }))
  }



  saveComment(newComment:string){
    if(!this.postId) return;
    if(this.editComment && !this.addComment){
      let update:UpdateComponent = {
        id: this.editComment.id,comment:newComment}
      this.subscriptions.push( this.commentsService
      .updateComment(update)
      .subscribe({
      next:()=>this.getComments(),
    }))
    this.editComment = null
    }
  }

  addNewComment(comment:string){
      const create:CreateComment = {
        idPost: this.postId!, comment}

        this.subscriptions.push( this.commentsService
        .createComment(create).subscribe({
        next:()=>this.getComments()
      }))
      this.addComment = false
  }

  emittDate():void{
    this.dateOutput.emit(new Date());
  }

  changeToggleName():void{
    this.upperLowerWord = !this.upperLowerWord;
  }

}
