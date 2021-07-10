import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, User } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-campaign-comment',
  templateUrl: './campaign-comment.component.html',
  styleUrls: ['./campaign-comment.component.css']
})
export class CampaignCommentComponent implements OnInit {

  constructor(private service: DataService,
              private authService: AuthService,
              private toastr: ToastrService) { }

  @Input() comment: Comment;
  @Input() campaignId;
  @Input() owner;
  @Output() eventClick = new EventEmitter<any>();
  submitter: User;
  faTrash = faTrash;
  faPen = faPen;
  flagEdit = false;
  commentForm = new FormGroup({
    content: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.service.getUser(this.comment.submitter).subscribe(user => this.submitter = user)
    this.initializeForm()
  }

  removeComment() {
    if (window.confirm('Дали сте сигурни дека сакате да го избришете овој коментар?')) {

      this.service.deleteComment(this.campaignId, this.comment.id).subscribe(data => {
        this.toastr.success('Comment has been successfully deleted','Success!')
        this.eventClick.emit(data)
      })
    }
  }

  isAuthor() {
    return (this.authService.getCurrentUser()?.email === this.comment.submitter) || this.owner === true
  }

  isSubmitter() {
    return (this.authService.getCurrentUser()?.email === this.comment.submitter)
  }

  initializeForm() {
    let content = new FormControl(this.comment.content, [Validators.required]);
    this.commentForm = new FormGroup({
      content: content
    })
  }

  onSubmit() {
    let comment = {
      id: this.comment.id,
      content: this.commentForm.value.content,
      submitter: this.comment.submitter,
      submissionTime: this.comment.submissionTime
    }

    console.log(comment)
    this.service.editComment(this.campaignId, this.comment.id, comment).subscribe(data => {
      this.eventClick.emit(data)
    })
    this.flagEdit = false;
  }

  editComment() {
    this.flagEdit = true;
  }

  cancel() {
    this.flagEdit = false;
  }
}
