import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, updateDoc, DocumentReference, setDoc, getDoc } from '@angular/fire/firestore';

import { LoginUser } from '../interfaces/loginUser.interface';
import { RegisterUser } from '../interfaces/registerUser.interface';
import { FireAuthResponse } from '../interfaces/fireLoginResponse.interface';
import { FireUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private fireUser = new BehaviorSubject<FireUser>({} as FireUser);
   private token:string| null = null;

  constructor(
    private router: Router,
    private auth: Auth,
    private fire: Firestore,
  ) {
    this.checkUser();
  }

  private checkUser(): void {
    console.log(this.auth.currentUser)
    this.auth.currentUser?.getIdToken().then((res)=>{
      console.log(res)
      this.token = res
    })

  }

  public getToken(){
    return this.token;
  }


  /* ----- auth ----- */
  verifyImg(url: string): void {
    fetch(new Request(url, { method: 'HEAD', mode: 'no-cors' }))
      .then(() => this.fireAlert('Imagen válida'))
      .catch(() => this.fireAlert('Imagen inválida', true));
  }

  public loginfire(user: LoginUser): void {
    signInWithEmailAndPassword(this.auth,user.mail, user.password)
      .then((res) => {
        console.log(res)
        console.log(this.auth.currentUser)

        res.user?.getIdTokenResult()
        .then((res)=>this.token = res.token)
        this.fireAlert('Inicio de sesion exitoso!');
        this.getFireUser();
        this.router.navigate(['/home']);
      });
  }

  public registerFire(user: RegisterUser): void {
      createUserWithEmailAndPassword(this.auth,user.mail, user.password)
      .then((value: any) => {
        console.log(value)
        const res = value as FireAuthResponse;
        this.addFireUser(user, res.user.uid);
      });
  }



  private fireAlert(message: string, err?: boolean): void {
    Swal.fire({
      icon: err ? 'error' : 'success',
      timer: 1500,
      title: message,
    });
  }

   /* ----- CRUD User ----- */

  private addFireUser(user: RegisterUser, uid: string) {
    const { password, ...others } = user;
    const newuser: FireUser = { ...others, uid, role: ['USER'] };
    const dataRef = collection(this.fire,`users`)

    const docRef = doc(dataRef,`${uid}`);

    setDoc(docRef,newuser)
      .then((res) => {
        console.log(res)
        this.loginfire({ mail: user.mail, password });
      });
  }

  private async getFireUser() {
    const uid = this.auth.currentUser?.uid
    const user = doc(this.fire,`users/${uid}`)
    const data =  await getDoc(user)
    const userData = data.data() as FireUser;
    console.log({userData})
    this.fireUser.next(userData)
  }

  public async updateUser(newUser:FireUser) {
    const uid = this.auth.currentUser?.uid
    const user = doc(this.fire,`users/${uid}`) as DocumentReference<FireUser>;
    updateDoc(user,newUser).then((res)=>{
      console.log(res)
      this.getFireUser()
    })
  }

  public getUser():Observable<FireUser>{
    return this.fireUser.asObservable()
  }

  logout() {
    signOut(this.auth).then(() => {
      this.fireAlert('Sesión cerrada correctamente');
      this.router.navigate(['/login'])
      this.token = null;
    });
  }
}
