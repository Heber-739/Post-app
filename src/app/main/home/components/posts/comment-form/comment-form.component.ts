import { Component, Input,EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/interfaces/comment.interface';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() comment!:Comment;
  @Output() newInputText = new EventEmitter<string>()

  public addComment = new FormControl('',[Validators.required])
  public editComment = new FormControl('',[Validators.required])
  constructor() { }

  ngOnInit(): void {
    this.initFormField()
  }

  private initFormField(){
    if(this.comment){
      this.editComment.setValue(this.comment.comment)
    }
  }

  saveComment(){

    if(!this.comment ){
    this.newInputText.emit(
      this.addComment.value ?? 'vacio'
      )
    }
    if(this.comment){
    }
    this.newInputText.emit(
      this.editComment.value ?? 'vacio'
      )
  }
}
