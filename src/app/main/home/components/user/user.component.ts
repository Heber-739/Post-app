import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FireUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  public user: FireUser | null = null;
  edit: boolean = false;
  private subscriptions: Subscription[] = [];
  public userForm!: FormGroup;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  finish(): void {
    this.edit = !this.edit;
  }

  private getUser(): void {
    this.subscriptions.push(
      this.auth.getUser().subscribe({
        next: (user) => (this.user = user),
      })
    );
  }
  public getDate(): Date {
    if (!this.user) return new Date();
    const seconds = Object.values(this.user.birthday)[0];
    return new Date(seconds * 1000);
  }
}
