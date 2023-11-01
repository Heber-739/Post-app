import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit,OnDestroy ,Output } from '@angular/core';
import { Author, Comment } from 'src/app/interfaces/comment.interface';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthService } from 'src/app/services/auth.service';
import { FireUser, Role } from 'src/app/interfaces/user.interface';
import { Post, State } from 'src/app/interfaces/posts.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  public user!:FireUser;
  public isAdmin:boolean = false;
  public upperLowerWord: boolean = false;
  public comments:Comment[]=[];

  public editComment:Comment|null = null;
  private subscriptions:Subscription[]=[];
  public addComment:boolean = false;
  likes:Author[] | null = null;

  isProtected:boolean = false;

  @Input() post!:Post;
  @Output() dateOutput = new EventEmitter<Date>();

  constructor(private auth:AuthService,
    private postService:PostService,
    private commentsService:CommentsService) { }

  ngOnInit(): void {
    this.getUser()
    this.getComments()
    this.setProtected()
  }

    ngOnDestroy(): void {
      this.subscriptions.forEach(s=>s.unsubscribe())
      this.savePostStatus()
    }

    private savePostStatus(){
      if(this.isAdmin || this.post.author.uid === this.user.uid){
        if(this.post.state === State.PROTECTED && !this.isProtected){
        this.post.state = State.PUBLIC
        this.postService.updatePost(this.post)
      }else if(this.post.state !== State.PROTECTED && this.isProtected){
        this.post.state = State.PROTECTED
        this.postService.updatePost(this.post)
      }
    }
  }

    toogleComments(){
      this.isProtected = !this.isProtected;
    }

    private setProtected(){
      if(this.post.state === State.PROTECTED){
        this.isProtected = true;
      }
    }

      private getUser(){
    this.subscriptions.push(this.auth.getUser()
    .subscribe({
      next:(res)=>{
        this.user = res
        this.isAdmin = this.user.role.includes(Role.ADMIN)
        }
    }))
  }

  private getComments():void{
      this.commentsService.getCommentsByPostId(this.post.id)
      .then((res)=>{
        this.comments = this.sortCommentsByDate(res)
        const dateData = this.comments[0].creationDate
        this.dateOutput.emit(dateData);
      })
  }

  private sortCommentsByDate(comments: Comment[]): Comment[] {
  return comments.slice().sort((a, b) => a.creationDate.valueOf()-b.creationDate.valueOf()).reverse();
}

  sendEditComment(comment:Comment | null){
    console.log(comment)
    this.editComment = comment
  }

  deleteComment(id:string){
      this.commentsService.deleteComment(id,this.post.id)
      .then((res)=>{
        if(res){
          this.comments = this.comments.filter((c)=>c.id!=id)
        }
      })
  }

  likeToComment(comment:Comment){
    const { imageUrl,username,name,uid} = this.user;
    const index = this.comments.findIndex((comm)=>comm.id == comment.id)
    let exist = this.comments[index].likes.some((user)=>user.uid === comment.author.uid)

    if(exist){
      this.comments[index].likes = this.comments[index].likes.filter((user)=>user.uid!==comment.author.uid)
    } else {
      this.comments[index].likes.push({ imageUrl,username,name,uid})
    }

    this.commentsService.updateComment(this.comments[index])
  }

  viewLikes(data:Author[]|null){
    this.likes = data;
  }

  isLiked(comment:Comment):boolean{
    return comment.likes.some((user)=>user.uid==this.user.uid)
  }

  saveComment(update:string){
    if(!this.post) return;
    if(this.editComment && !this.addComment){
      this.editComment.comment = update;
    this.commentsService.updateComment(this.editComment)
      .then(()=>{
        this.comments = this.comments.map((c)=>
        c.id === this.editComment!.id ? this.editComment! : c)
        this.editComment = null
      })
    }
  }

  addNewComment(comment:string){
    if(comment === 'vacio') return;
    const {uid,name,username,imageUrl} = this.user
      const create:Comment = {
        author:{uid,name,username,imageUrl},
        comment,
        idPost: this.post.id,
        creationDate: new Date(),
        state:true,
        likes:[],
        id:'new'
      }
          this.commentsService
        .createComment(create).then((res)=>{
          this.comments.unshift(res)
          this.addComment = false
      this.dateOutput.emit(new Date());
        })

  }

  changeToggleName():void{
    this.upperLowerWord = !this.upperLowerWord;
  }

}
