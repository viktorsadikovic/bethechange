import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Campaign, User } from '../shared/data.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService,
              private service: DataService,
              private route: ActivatedRoute) { }

  createdCampaigns: Campaign[];
  joinedCampaigns: Campaign[];
  favoriteCampaigns: Campaign[];
  visibleCampaigns: Campaign[];
  flag = 1;
  user: User;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.service.getUser(params['email']).subscribe(data => {
        this.user = data
        this.getCreated()
      })
    })

    // this.user = this.authService.getCurrentUser();
  }

  change(type){

    if(type === "CREATED"){
      this.flag = 1;
      this.getCreated();
    } else if (type === "JOINED") {
      this.flag = 2;
      this.getJoined();
    } else if(type === "FAVORITE") {
      this.flag = 3;
      this.getFavorites();
    }
  }

  getFavorites() {
    this.service.getFavoriteCampaignsFor(this.user.email).subscribe(data => this.visibleCampaigns = data)
  }

  getJoined() {
    this.service.getJoinedCampaignsBy(this.user.email).subscribe(data => this.visibleCampaigns = data)
  }

  getCreated() {
    this.service.getCampaignsCreatedBy(this.user.email).subscribe(data => this.visibleCampaigns = data)
  }
}
