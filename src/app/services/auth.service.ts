import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, updateDoc, DocumentReference, setDoc, getDoc } from '@angular/fire/firestore';

import { LoginUser } from '../interfaces/loginUser.interface';
import { RegisterUser } from '../interfaces/registerUser.interface';
import { FireAuthResponse } from '../interfaces/fireLoginResponse.interface';
import { FireUser, Role } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fireUser = new BehaviorSubject<FireUser>({} as FireUser);
  private token: string | null = null;

  constructor(
    private router: Router,
    private auth: Auth,
    private fire: Firestore
  ) {
    this.checkLoginData();
  }

  private checkLoginData(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      localStorage.clear();
    } else {
      this.fireUser.next(JSON.parse(user));
      this.token = JSON.parse(token);
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  /* ----- auth ----- */
  verifyImg(url: string): void {
    fetch(new Request(url, { method: 'HEAD', mode: 'no-cors' }))
      .then(() => this.fireAlert('Imagen válida'))
      .catch(() => this.fireAlert('Imagen inválida', true));
  }

  public loginfire(user: LoginUser): void {
    signInWithEmailAndPassword(this.auth, user.mail, user.password)
      .then((res) => {
        res.user.getIdTokenResult().then((res) => {
          localStorage.setItem('token', JSON.stringify(res));
          this.token = res.token;
          this.fireAlert('Inicio de sesion exitoso!');
          this.getFireUser();
          this.router.navigate(['/home']);
        });
      })
      .catch(() => this.fireAlert('Credenciales invalidas', true));
  }

  public registerFire(user: RegisterUser): void {
    createUserWithEmailAndPassword(this.auth, user.mail, user.password).then(
      (value: any) => {
        const res = value as FireAuthResponse;
        this.addFireUser(user, res.user.uid);
      }
    );
  }

  private fireAlert(message: string, err?: boolean): void {
    Swal.fire({
      icon: err ? 'error' : 'success',
      timer: 1500,
      title: message,
    });
  }

  /* ----- CRUD User ----- */

  private addFireUser(user: RegisterUser, uid: string): void {
    const { password, ...others } = user;
    const newuser: FireUser = { ...others, uid, role: [Role.USER] };
    const dataRef = collection(this.fire, `users`);
    const docRef = doc(dataRef, `${uid}`);

    setDoc(docRef, newuser).then(() => {
      this.loginfire({ mail: user.mail, password });
    });
  }

  private async getFireUser(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    const user = doc(this.fire, `users/${uid}`);
    const data = await getDoc(user);
    const userData = data.data() as FireUser;
    localStorage.setItem('user', JSON.stringify(userData));
    this.fireUser.next(userData);
  }

  public updateUser(newUser: FireUser): void {
    const uid = this.auth.currentUser?.uid;
    const user = doc(this.fire, `users/${uid}`) as DocumentReference<FireUser>;
    updateDoc(user, newUser).then(() => {
      this.getFireUser();
    });
  }

  public getUser(): Observable<FireUser> {
    return this.fireUser.asObservable();
  }

  logout(): void {
    signOut(this.auth).then(() => {
      this.token = null;
      this.fireUser.next({} as FireUser);
      localStorage.clear();
      this.fireAlert('Sesión cerrada correctamente');
      this.router.navigate(['/login']);
    });
  }
}
