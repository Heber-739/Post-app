import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterUser } from 'src/app/interfaces/registerUser.interface';
import { FireUser } from 'src/app/interfaces/user.interface';
import { LngLat } from 'mapbox-gl';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Input() user:FireUser|null=null;
  @Output() finish = new EventEmitter<void>();

  coords:[number,number]=[-64.18277140625692,-31.416732556232994]

  hide: boolean = true;

  private subscriptions:Subscription[]=[];
  public userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService){}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s=>s.unsubscribe())
  }

  cancel(){
    this.finish.emit();
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
      address: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(50)]],
        location: ['', [Validators.required, Validators.maxLength(50)]],
        city: ['', [Validators.required, Validators.maxLength(50)]],
        country: ['', [Validators.required, Validators.maxLength(50)]],
      }),
      phone: ['', [Validators.maxLength(15)]],
      birthday: [],
    });

    if(!this.user){
      this.userForm.addControl('password',this.fb.control('',Validators.required))
    } else{
      const {uid,coords,role,birthday,...others} = this.user;
      const seconds = Object.values(birthday)[0];
      this.userForm.setValue({birthday:new Date(seconds * 1000),...others})
      this.coords = coords;

       this.subscriptions.push(
    this.userForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(res=>{
      Object.assign(this.user!,res)
      console.log(this.user)
    }))

    }

   this.subscriptions.push(
    this.userForm.controls['imageUrl'].valueChanges.pipe(
      debounceTime(2000),
     ).subscribe(res=>this.authService.verifyImg(res)))

  }

  saveCoords(coords: [number,number]){
    console.log(coords)
    this.coords = coords;
    if(this.user) this.user.coords = coords;

  }


  onSubmit() {
    const addressGroup = this.userForm.get('address') as FormGroup;
    if (this.userForm.invalid || addressGroup.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if(this.user){
      this.authService.updateUser(this.user);
    }else{
      const registerUser: RegisterUser = {...this.userForm.value,coords:this.coords};
      this.authService.registerFire(registerUser)
    }

        console.log(this.user)
        this.finish.emit()
 }


}
