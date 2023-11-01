import { Component, Input,EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() comment:string | null = null;

  @Output() newInputText = new EventEmitter<string>()

  label:string = 'Nuevo Comentario'
  public commentControl = new FormControl('',[Validators.required,
    Validators.minLength(5),
    Validators.maxLength(200),])

  constructor() { }

  ngOnInit(): void {
    this.initFormField()
  }

  private initFormField(){
    if(this.comment){
      this.commentControl.setValue(this.comment)
    }
  }

  saveComment(){
    if(this.commentControl.invalid) return;

    this.newInputText.emit(
      this.commentControl.value!
      )
  }
}
