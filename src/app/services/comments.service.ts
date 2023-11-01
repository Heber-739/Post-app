import { Observable, catchError, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comment, NewCommnet } from '../interfaces/comment.interface';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private url:string = environment.urlBase+environment.commentsByPostId;
  private urlCreate:string = environment.urlBase+environment.createComment;
  private urlDelete:string = environment.urlBase+environment.commentDelete;
  private urlUpdate:string = environment.urlBase+environment.commentUpdate;

  constructor(private fire:Firestore) { }


  public getCommentsByPostId(postId:string):Promise<Comment[]>{
    return new Promise(async (resolve)=>{
      const docRef = collection(this.fire,`posts/${postId}/comments`)
      const commentsData = await getDocs(docRef)
      const comments = commentsData.docs.map((comm)=> comm.data() as Comment)
      resolve(comments)
        })
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
