import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, of, tap,  } from 'rxjs';
import { ResponsePostList, Post } from '../interfaces/responsePostList.interface';
import { ResponsePostByID } from '../interfaces/responsePostById.interface';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})

export class PostService {
    private url:string = environment.urlBase + environment.posts;
    private urlPostById:string = environment.urlBase + environment.postById;

    constructor(private http: HttpClient) {}

    public getPosts():Observable<Post[]>{
      return of([]);
    // const docRef = this.fire.collection<Post>('posts');
    // return docRef.get().pipe(tap(console.log))
    }

    public getPostDetail(postId:string):Observable<Post>{
        return this.http.get<ResponsePostByID>(`${this.urlPostById}/${postId}`).pipe(
          map((res)=>res.data.post)
        )
    }

    public addPost(post:Post,uid:string){
      // this.fire
      //   .collection('posts')
      //   .doc(uid)
      //   .set(post)
      //   .then(() => {
      //     Swal.fire({
      //       title:'Post agregado',
      //       icon:'success',
      //       timer:2000
      //     })
      //   });
    }

}
