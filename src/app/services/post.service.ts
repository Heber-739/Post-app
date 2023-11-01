import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

import { Firestore, collection, addDoc, getDocs, doc, DocumentReference, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { Post, State } from '../interfaces/posts.interface';

@Injectable({providedIn: 'root'})

export class PostService {
    private allPosts:Post[] =[];



    constructor(
      private fire:Firestore) {}

    public getPostById(id:string):Promise<Post>{
      const data = doc(this.fire,`posts/${id}`) as DocumentReference<Post>;
      return new Promise(async (resolve)=>{
        await getDoc(data).then((res)=> resolve(res.data() as Post))
      })
    }


    public getPosts(uid:string,isAdmin:boolean):Promise<Post[]>{
      return new Promise(async (resolve)=>{
        if(this.allPosts.length>0){
          resolve(this.allPosts)
        } else if(localStorage.getItem('allPosts')){
          resolve(JSON.parse(localStorage.getItem('allPosts')!))
        }
        const data = await getDocs(collection(this.fire,'posts'))
        data.docs.forEach((dat)=>{
          const post = dat.data() as Post;
          if(post.author.uid === uid){
              this.allPosts.push(post)
          }else if (post.state !== State.PRIVATE || isAdmin){
              this.allPosts.push(post)
          }
        })
        localStorage.setItem('allPosts',JSON.stringify(this.allPosts))
         resolve(this.allPosts);
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

    public deletePost(id:string):Promise<void>{
      Swal.fire({
  title: 'Eliminar post?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Eliminar',
  denyButtonText: 'Cancelar',
}).then((result) => {
  if (result.isConfirmed) {
    const placeDocRef = doc(this.fire, `posts/${id}`);
    deleteDoc(placeDocRef).then(()=>{
      this.allPosts = this.allPosts.filter((p)=>p.id!=id)
      Swal.fire('Post eliminado!', '', 'success')
    })
  } else if (result.isDenied) {
    Swal.fire('Cancelado', '', 'info')
  }
})
return Promise.resolve()
    }

}
