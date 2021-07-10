import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Campaign } from 'src/app/shared/data.model'
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css']
})
export class CampaignCreateComponent implements OnInit {

  constructor(private service: DataService,
              private router: Router,
              private toastr: ToastrService,
              private storage: AngularFireStorage) { }

  campaignForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    quorum: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  selectedFile: File;

  get title() { return this.campaignForm.get('title'); }
  get description() { return this.campaignForm.get('description'); }
  get location() { return this.campaignForm.get('location'); }
  get time() { return this.campaignForm.get('time'); }
  get quorum() { return this.campaignForm.get('quorum'); }
  get image() { return this.campaignForm.get('image'); }

  campaign: Campaign;

  ngOnInit(): void {
  }

  onSubmit() {


    this.campaign = {
      id: null,
      title: this.campaignForm.value.title,
      description: this.campaignForm.value.description,
      location: this.campaignForm.value.location,
      category: this.campaignForm.value.category,
      time: this.campaignForm.value.time,
      quorum: this.campaignForm.value.quorum,
      image: null,
      createdAt: null,
      creator: null,
      comments: null
    }

    var filePath = this.selectedFile.name;
    const fileRef = this.storage.ref(filePath);

    this.storage.upload(filePath, this.selectedFile).snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.campaign.image = url

              this.service.createCampaign(this.campaign).toPromise().then(data => {
                this.toastr.success('New campaign was successfully created!', 'Success!')
                this.router.navigate(['/campaign/' + data.id])
              }).catch((err) => {
                this.toastr.error('Something went wrong!', 'Oops')
              })
        })
      })
    )
    .subscribe()
  }

  cancel() {
    this.router.navigate(['/home/all'])
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }
}
