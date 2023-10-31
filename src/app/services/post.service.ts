import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

import { Firestore, collection, addDoc, getDocs, doc, DocumentReference, updateDoc, deleteDoc } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { FireUser } from '../interfaces/user.interface';
import { Post, State } from '../interfaces/posts.interface';

@Injectable({providedIn: 'root'})

export class PostService {
    private urlPostById:string = environment.urlBase + environment.postById;
    private userPosts:Post[] = []
    private allPosts:Post[] | null = null;



    constructor(
      private http: HttpClient,
      private fire:Firestore) {}


    public getPostDetail(postId:string):Observable<Post>{
        return this.http.get<Post>(`${this.urlPostById}/${postId}`).pipe(
          map((res)=>res)
        )
    }


    public getPosts(uid:string,isAdmin:boolean):Promise<Post[]>{
      return new Promise(async (resolve)=>{
        if(this.allPosts){
          resolve(this.allPosts)
        }
        let posts:Post[] = []
        this.allPosts = [];
        const data = await getDocs(collection(this.fire,'posts'))
        data.docs.forEach((dat)=>{
          const post = dat.data() as Post;
          if(post.author.uid === uid){
              this.userPosts.push(post)
              posts.push(post)
              this.allPosts!.push(post)
          }else if (post.state !== State.PRIVATE || isAdmin){
              posts.push(post)
              this.allPosts!.push(post)
          }
        })
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
      Swal.fire({
        /* agregar verificacion */
      })
      const placeDocRef = doc(this.fire, `posts/${post.id}`);
    return deleteDoc(placeDocRef)
    }

}
