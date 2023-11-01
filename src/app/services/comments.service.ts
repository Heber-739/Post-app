import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';
import { DocumentReference, Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private fire: Firestore) {}

  public getCommentsByPostId(postId: string): Promise<Comment[]> {
    return new Promise(async (resolve) => {
      const docRef = collection(this.fire, `posts/${postId}/comments`);
      const commentsData = await getDocs(docRef);
      const data = commentsData.docs.map((comm) => {
        let doc = comm.data() as Comment;
        const seconds = Object.values(doc.creationDate)[0];
        doc.creationDate = new Date(seconds * 1000);
        return doc;
      });
      resolve(data);
    });
  }

  public createComment(create: Comment): Promise<Comment> {
    const dataRef = collection(this.fire, `posts/${create.idPost}/comments`);
    return new Promise(async (resolve) => {
      await addDoc(dataRef, create)
        .then((res) => {
          create.id = res.id;
          this.updateComment(create);
          resolve(create);
        })
        .catch((err) => console.error(err));
    });
  }

  public updateComment(comment: Comment): Promise<void> {
    return new Promise(async (resolve) => {
      const docPost = doc(
        this.fire,
        `posts/${comment.idPost}/comments/${comment.id}`
      ) as DocumentReference<Comment>;
      await updateDoc(docPost, comment).then(() => {
        resolve();
      });
    });
  }

  public deleteComment(id: string, idPost: string): Promise<boolean> {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Eliminar comentario?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          const placeDocRef = doc(this.fire, `posts/${idPost}/comments/${id}`);
          deleteDoc(placeDocRef).then(() => {
            Swal.fire('Post eliminado!', '', 'success');
            resolve(true);
          });
        } else {
          resolve(false);
        }
      });
    });
  }
}
