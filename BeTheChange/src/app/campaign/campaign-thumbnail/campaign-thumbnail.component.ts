import { Component, Input, OnInit } from '@angular/core';
import { Campaign } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-campaign-thumbnail',
  templateUrl: './campaign-thumbnail.component.html',
  styleUrls: ['./campaign-thumbnail.component.css']
})
export class CampaignThumbnailComponent implements OnInit {

  constructor(private service: DataService) { }

  @Input() campaign: Campaign;
  joined;
  progress;

  ngOnInit(): void {
    this.service.getNumberOfJoinedUsersByCampaign(this.campaign.id).subscribe(data => {
      this.joined = data;
      this.progress = (this.joined/this.campaign.quorum) * 100
    })

  }

}
