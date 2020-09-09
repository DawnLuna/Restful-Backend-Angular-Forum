import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { ApiService, Thread, Reply } from 'src/app/core';

@Component({
  selector: 'forum-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @Input() type: string = '';
  @Input() id: string = '';
  @Output() thread = new EventEmitter<Thread>();
  @Output() reply = new EventEmitter<Reply>();

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    minWidth: '10rem',
    minHeight: '15rem',
    translate: 'no',
    placeholder: 'Enter here...',
    defaultParagraphSeparator: 'p',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'fontName'
      ],
      ['fontSize', 'insertImage', 'insertVideo',]
    ]
  };

  threadForm: FormGroup;
  replyForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.threadForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(5000)
      ])
    });
    this.replyForm = new FormGroup({
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(5000)
      ]),
    });
  }

  postThread() {
    this.isSubmitting = true;
    this.api.postThread(this.id, this.threadForm.value).subscribe(
      thread => {
        this.threadForm.reset();
        this.thread.emit(thread);
        this.isSubmitting = false;
      }, error => this.isSubmitting = false
    );
  }

  postReply() {
    this.isSubmitting = true;
    this.api.postReply(this.id, this.replyForm.value).subscribe(
      reply => {
        this.replyForm.reset();
        this.reply.emit(reply);
        this.isSubmitting = false;
      }, error => this.isSubmitting = false
    );
  }

  get threadTitle() {
    return this.threadForm.get('title');
  }

  get threadContent() {
    return this.threadForm.get('content');
  }

  get replyContent() {
    return this.replyForm.get('content');
  }

}
