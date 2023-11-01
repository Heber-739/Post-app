import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

import { Firestore, collection, addDoc, getDocs, doc, DocumentReference, updateDoc, deleteDoc } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { Post, State } from '../interfaces/posts.interface';

@Injectable({providedIn: 'root'})

export class PostService {
    private urlPostById:string = environment.urlBase + environment.postById;
    private userPosts:Post[] = []
    private allPosts:Post[] =[];



    constructor(
      private http: HttpClient,
      private fire:Firestore) {}


    public getPostDetail(postId:string):Observable<Post>{
        return this.http.get<Post>(`${this.urlPostById}/${postId}`).pipe(
          map((res)=>res)
        )
    }

    public getPostById(id:string){
      return this.allPosts.find((post)=>post.id===id);
    }


    public getPosts(uid:string):Promise<Post[]>{
      return new Promise(async (resolve)=>{
        if(this.allPosts.length>0){
          resolve(this.allPosts)
        } else if(localStorage.getItem('allPosts')){
          resolve(JSON.parse(localStorage.getItem('allPosts')!))
        }
        let posts:Post[] = []
        const data = await getDocs(collection(this.fire,'posts'))
        data.docs.forEach((dat)=>{
          const post = dat.data() as Post;
          if(post.author.uid === uid){
              this.userPosts.push(post)
              posts.push(post)
              this.allPosts.push(post)
          }else if (post.state !== State.PRIVATE){
              posts.push(post)
              this.allPosts.push(post)
          }
        })
        localStorage.setItem('allPosts',JSON.stringify(this.allPosts))
         resolve(posts);
      })
    }

    public addPost(post:Post):Promise<void>{
      const postRef = collection(this.fire,'posts')
      return new Promise((resolve)=>{
        addDoc(postRef,post).then((res)=>{
          post['id']=res.id;
          this.updatePost(post)
          if(this.allPosts.length>0) this.allPosts.unshift(post)
          resolve();
        }).catch((err)=>console.log(err))
      })
    }

    public updatePost(post:Post):Promise<boolean>{
      return new Promise((resolve)=>{
        const docPost = doc(this.fire,`posts/${post.id}`) as DocumentReference<Post>;
        updateDoc(docPost,post).then(()=>{
          this.allPosts = this.allPosts.map((p)=> p.id === post.id ? post:p)
          resolve(true)
        })
      })
    }

    public deletePost(id:string){
      Swal.fire({
        /* agregar verificacion */
      })
      const placeDocRef = doc(this.fire, `posts/${id}`);
    return deleteDoc(placeDocRef)
    }

}
