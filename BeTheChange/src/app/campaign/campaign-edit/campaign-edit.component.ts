import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { Campaign } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  constructor(private service: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private storage: AngularFireStorage,
              private toastr: ToastrService) { }

  campaignForm = new FormGroup({
  title: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  location: new FormControl('', [Validators.required]),
  category: new FormControl('ANIMALS', [Validators.required]),
  time: new FormControl('', [Validators.required]),
  quorum: new FormControl('', [Validators.required]),
  newImage: new FormControl('', Validators.required)
  })

  get title() { return this.campaignForm.get('title'); }
  get description() { return this.campaignForm.get('description'); }
  get location() { return this.campaignForm.get('location'); }
  get time() { return this.campaignForm.get('time'); }
  get quorum() { return this.campaignForm.get('quorum'); }

  campaign: Campaign;
  selectedFile: File;
  newImage = false;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.service.getSingleCampaign(+params['id']).subscribe(data => {
        this.campaign = data;
        this.initializeForm();
      })
    })
  }

  initializeForm() {
    let title = new FormControl(this.campaign.title, [Validators.required]);
    let description = new FormControl(this.campaign.description, [Validators.required]);
    let location = new FormControl(this.campaign.location, [Validators.required]);
    let category = new FormControl(this.campaign.category, [Validators.required]);
    let time = new FormControl(this.campaign.time, [Validators.required]);
    let quorum = new FormControl(this.campaign.quorum, [Validators.required]);
    let newImage = new FormControl(false, Validators.required)

    this.campaignForm = new FormGroup({
      title: title,
      description: description,
      location: location,
      category: category,
      time: time,
      quorum: quorum,
      newImage: newImage
    })
  }

  cancel() {
    this.router.navigate(['/campaign/' + this.campaign.id])
  }

  onSubmit() {
    this.campaign = {
      id: this.campaign.id,
      title: this.campaignForm.value.title,
      description: this.campaignForm.value.description,
      location: this.campaignForm.value.location,
      category: this.campaignForm.value.category,
      time: this.campaignForm.value.time,
      quorum: this.campaignForm.value.quorum,
      image: this.campaign.image,
      createdAt: this.campaign.createdAt,
      creator: this.campaign.creator,
      comments: this.campaign.comments
    }

    if(this.newImage) {
      var filePath = this.selectedFile.name;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedFile).snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.campaign.image = url

            this.service.editCampaign(this.campaign.id, this.campaign).toPromise().then(data => {
              this.toastr.success('Campaign was successfully updated!', 'Success!')
              this.router.navigate(['/campaign/' + this.campaign.id])
            }).catch((err) => {
              this.toastr.error('Something went wrong!', 'Oops')
            })
          })
        })
      )
      .subscribe()
    } else {
      this.service.editCampaign(this.campaign.id, this.campaign).toPromise().then(data => {
        this.toastr.success('Campaign was successfully updated!', 'Success!')
        this.router.navigate(['/campaign/' + this.campaign.id])
      }).catch((err) => {
        this.toastr.error('Something went wrong!', 'Oops')
      })
  }
  }

  addNewImage() {
    return this.newImage;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }
}
