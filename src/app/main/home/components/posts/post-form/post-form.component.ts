import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post, State } from 'src/app/interfaces/posts.interface';
import { FireUser, Role } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit{

  postForm!:FormGroup;
  private subscriptions:Subscription[]=[]
  user!:FireUser;


  @Input() post:Post | null = null;
  @Output() finish = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private postService:PostService,
    private auth:AuthService
    ){}


  ngOnInit(): void {
    this.initForm()
    this.getUser()
  }

  private getUser(){
    this.subscriptions.push(
  this.auth.getUser().subscribe(res => this.user = res))
  }


  private initForm(){
    this.postForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
        ],
      ],
      state: [true],
    });
    if(this.post){
      this.postForm.setValue({
        title:this.post.title,
        description:this.post.description,
        state:this.post.state === 'PUBLIC'
      })
    }
    this.postForm.valueChanges.subscribe((res)=>console.log(res))
  }

  cancel(){
    this.finish.emit(false);
  }

  onSubmit(){
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    const {title,description,state}=this.postForm.value;
    const  {uid,imageUrl,username} = this.user

    const post:Post = {
      author:{uid,imageUrl,username},
      title,
      description,
      creationDate: this.post?.creationDate ?? new Date(),
      modificationDate:  new Date(),
      id:this.post?.id ?? 'new' ,
      state: state ? State.PUBLIC:State.PRIVATE
    }
    console.log(post)

    if(this.post){
      this.postService.updatePost(post).then(()=>this.finish.emit(true))
    } else {
      this.postService.addPost(post).then(()=>this.finish.emit(true))
    }


  }



}
