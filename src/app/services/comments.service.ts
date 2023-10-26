import { Observable, catchError, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comment, NewCommnet,ResponseCreateComment, ResponseCommentsByID, CreateComment, UpdateComponent, DeleteComment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private url:string = environment.urlBase+environment.commentsByPostId;
  private urlCreate:string = environment.urlBase+environment.createComment;
  private urlDelete:string = environment.urlBase+environment.commentDelete;
  private urlUpdate:string = environment.urlBase+environment.commentUpdate;

  constructor(private http: HttpClient) { }


  public getCommentsByPostId(postId:string):Observable<Comment[]>{
    return this.http.get<ResponseCommentsByID>(`${this.url}/${postId}`).pipe(
      map((res)=>res.data.comments)
    )
  }

  public createComment(create:CreateComment):Observable<NewCommnet>{
return this.http.post<ResponseCreateComment>(this.urlCreate,create).pipe(
  catchError((err)=>{
    console.log(err)
    throw new Error("Error")
  }),
  map((res)=>res.data))
  }

  public updateComment(comment:UpdateComponent):Observable<NewCommnet>{
    return this.http.put<ResponseCreateComment>(this.urlUpdate,comment).pipe(
      catchError((err)=>{
        console.log(err)
        throw new Error("Error")
      }),
      map((res)=>res.data),
      )
      }

  public deleteComment(id:DeleteComment):Observable<NewCommnet>{
    return this.http.post<any>(this.urlDelete,id).pipe(
      catchError((err)=>{
        console.log(err)
        throw new Error("Error")
      }))
      }


}
