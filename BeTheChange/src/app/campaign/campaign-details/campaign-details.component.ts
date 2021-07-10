import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faHeart, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { Campaign, User } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {

  faHeart = faHeart;
  faTrash = faTrash;
  faPen = faPen;
  campaign: Campaign;
  joined = false;
  favorite = false;
  numJoined = 0;
  creator: User;
  progress = 100;
  category;
  joinedUsers: User[];

  commentForm = new FormGroup({
    content: new FormControl('', [Validators.required])
  })

  constructor(private service: DataService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.service.getSingleCampaign(+params['id']).subscribe(data => {
        this.campaign = data;
        this.checkCategory(this.campaign.category)

        this.service.getUser(this.campaign.creator).subscribe(user => this.creator = user)

        this.service.getNumberOfJoinedUsersByCampaign(+params['id']).subscribe(data => {
          this.numJoined = data;
          this.progress = (this.numJoined/this.campaign.quorum) * 100
        })
      })

      this.service.getJoinedUsersByCampaign(+params['id']).subscribe(data => {
        this.joinedUsers = data
      })

      if(this.authService.checkUserLoggedIn()) {
        console.log(this.authService.checkUserLoggedIn())
        this.service.checkJoined(+params['id']).subscribe(data => {
          this.joined = data;
        })

        this.service.checkFavorites(+params['id']).subscribe(data => {
          this.favorite = data;
        })
      }
    })
  }

  addToFavorites() {
    if(!this.authService.checkUserLoggedIn()) {
      this.router.navigate(['/login'])
      return;
    }

    this.service.addToFavorites(this.campaign.id).subscribe(data => {
      this.campaign = data;
      this.favorite = true
      this.toastr.success('Campaign has been added to favorites!', 'Success')
    })
  }

  removeFromFavorites() {
    this.service.removeFromFavorites(this.campaign.id).subscribe(data => {
      this.campaign = data;
      this.favorite = false;
      this.toastr.success('Campaign has been removed from favorites!', 'Success')

    })
  }

  joinCampaign() {
    if(!this.authService.checkUserLoggedIn()) {
      this.router.navigate(['/login'])
      return;
    }

    this.joined = true;
    this.service.joinCampaign(this.campaign.id).subscribe(data => {
      this.campaign = data;
      this.toastr.success('You have successfully joined the campaign!', 'Success')

      this.service.getNumberOfJoinedUsersByCampaign(this.campaign.id).subscribe(data => {
        this.numJoined = data;

        this.progress = (this.numJoined/this.campaign.quorum) * 100

      })

      this.service.getJoinedUsersByCampaign(this.campaign.id).subscribe(data => {
        this.joinedUsers = data
      })
    })

  }

  unjoinCampaign(){
    this.service.unjoinCampaign(this.campaign.id).subscribe(data => {
      this.campaign = data;
      this.joined = false;
      this.toastr.success('You have successfully unjoined the campaign', 'Success')

      this.service.getNumberOfJoinedUsersByCampaign(this.campaign.id).subscribe(data => {
        this.numJoined = data;

        this.progress = (this.numJoined/this.campaign.quorum) * 100

      })

      this.service.getJoinedUsersByCampaign(this.campaign.id).subscribe(data => {
        this.joinedUsers = data
      })
    })
  }

  addComment() {
    if(!this.authService.checkUserLoggedIn()) {
      this.router.navigate(['/login'])
      return;
    }

    let comment = {
      id: null,
      content: this.commentForm.value.content,
      submissionTime: null
    }

    this.service.addComment(this.campaign.id, comment).subscribe(data => {
      this.campaign = data;
      this.toastr.success('Comment has been successfully added ', 'Success')

    })
  }

  isJoined(){
    return this.joined;
  }

  isFavorite() {
    return this.favorite;
  }

  removeComment(campaign) {
    this.campaign = campaign
  }

  checkCategory(category) {
    if (category === "ENVIRONMENT"){
      this.category = "ЖИВОТНА СРЕДИНА"
    } else if (category === "ANIMALS") {
      this.category = "МИЛЕНИЦИ"
    } else if (category === "HUMAN_RIGHTS") {
      this.category = "ЧОВЕКОВИ ПРАВА"
    } else if (category === "EDUCATION") {
      this.category = "ЕДУКАЦИЈА"
    } else if (category === "HEALTH") {
      this.category = "ЗДРАВЈЕ"
    } else {
      this.category = "ОСТАНАТО"
    }
  }

  isAuthor() {
    return this.authService.getCurrentUser()?.email === this.campaign?.creator
  }

  editCampaign() {
    this.router.navigate(['/campaign/' + this.campaign.id + '/edit'])
  }

  removeCampaign() {
    if (window.confirm('Дали сте сигурни дека сакате да ја избришете оваа иницијатива?')) {
      this.service.deleteCampaign(this.campaign.id).subscribe(data => {
        this.toastr.success('Campaign has been successfully deleted', 'Success!')
        this.router.navigate(['/home/all'])
      })
    }
  }
}
