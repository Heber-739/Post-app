import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

import { Firestore, collection, addDoc, getDocs, doc, DocumentReference, updateDoc, deleteDoc } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { FireUser } from '../interfaces/user.interface';
import { Post } from '../interfaces/posts.interface';

@Injectable({providedIn: 'root'})

export class PostService {
    private urlPostById:string = environment.urlBase + environment.postById;

    public user!:Observable<FireUser[]>
    public posts!:Observable<Post[]>


    constructor(
      private http: HttpClient,
      private fire:Firestore) {}


    public getPostDetail(postId:string):Observable<Post>{
        return this.http.get<Post>(`${this.urlPostById}/${postId}`).pipe(
          map((res)=>res)
        )
    }


    public getPosts():Promise<Post[]>{
      return new Promise(async (resolve)=>{
        let posts:Post[] = []
        const data = await getDocs(collection(this.fire,'posts'))
        data.docs.forEach((s)=>posts.push(s.data() as Post))
        console.log('posts: ',posts)
         resolve(posts);
      })
    }

    public addPost(post:Post){
      const postRef = collection(this.fire,'posts')
      addDoc(postRef,post).then((res)=>{
        post['id']=res.id;
        this.updatePost(post)
      }).catch((err)=>console.log(err))
    }

    public updatePost(post:Post){
      const docPost = doc(this.fire,`posts/${post.id}`) as DocumentReference<Post>;
      updateDoc(docPost,post)
    }

    public deletePost(post:Post){
      const placeDocRef = doc(this.fire, `posts/${post.id}`);
    return deleteDoc(placeDocRef)
    }

}
