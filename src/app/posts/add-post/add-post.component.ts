import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      body: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      userId: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  addPost() {
    console.log(this.postForm.value);
  }
}
