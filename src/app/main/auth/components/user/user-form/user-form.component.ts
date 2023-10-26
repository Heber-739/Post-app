import { Subscription, debounceTime } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterUser } from 'src/app/interfaces/registerUser.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  hide: boolean = true;
  private subscriptions:Subscription[]=[];
  public userForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService:AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s=>s.unsubscribe())
  }

  private initForm() {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      imageUrl: [''],
      mail: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      password: ['', [Validators.required]] /* PendienTe!!! */,
      address: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(50)]],
        location: ['', [Validators.required, Validators.maxLength(50)]],
        city: ['', [Validators.required, Validators.maxLength(50)]],
        country: ['', [Validators.required, Validators.maxLength(50)]],
      }),
      phone: ['', [Validators.maxLength(15)]],
      birthday: [],
    });
   this.subscriptions.push(
    this.userForm.controls['imageUrl'].valueChanges.pipe(
      debounceTime(2000),
     ).subscribe(res=>this.authService.verifyImg(res)))
  }

  onSubmit() {
    const addressGroup = this.userForm.get('address') as FormGroup;
    if (this.userForm.invalid || addressGroup.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const registerUser: RegisterUser = this.userForm.value;
        this.authService.registerFire(registerUser)
  }
}
