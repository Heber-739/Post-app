import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LngLat } from 'mapbox-gl';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { FireUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {
  public user: FireUser = {} as FireUser;
  edit:boolean = false;
  private subscriptions:Subscription[]=[];
  public userForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private auth:AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s=>s.unsubscribe())
  }

  editUser(){
    this.edit = !this.edit;
    if(this.edit){
      this.initForm()
    }else if(this.edit){
      this.userForm.reset()
    }
  }

  private getUser(){
    this.subscriptions.push(this.auth.getUser()
    .subscribe({
      next:(user)=>this.user = user,
    }))
  }
  public getDate(){
    const seconds = Object.values(this.user.birthday)[0];
    return new Date(seconds * 1000)
  }

  private initForm() {
    this.userForm = this.fb.group({
      name: [
        this.user.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      username: [
        this.user.username,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      imageUrl: [this.user.imageUrl],
      address: this.fb.group({
        street: [this.user.address.street, [Validators.required, Validators.maxLength(50)]],
        location: [this.user.address.location, [Validators.required, Validators.maxLength(50)]],
        city: [this.user.address.city, [Validators.required, Validators.maxLength(50)]],
        country: [this.user.address.country, [Validators.required, Validators.maxLength(50)]],
      }),
      phone: [this.user.phone, [Validators.maxLength(15)]],
      birthday: [this.getDate()],
    });
    this.subscriptions.push(
    this.userForm.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(res=>{
      Object.assign(this.user,res)
      console.log(this.user)
    }))
  }

  saveCoords(coords: LngLat){
    console.log(coords);
  }

  onSubmit() {
    const addressGroup = this.userForm.get('address') as FormGroup;
    if (this.userForm.invalid || addressGroup.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    console.log(this.userForm.value)

        this.auth.updateUser(this.user);
        console.log(this.user)
        this.edit = false;
 }
}
