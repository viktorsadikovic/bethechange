import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Campaign } from '../shared/data.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  constructor(private service: DataService,
              private route: ActivatedRoute) { }

  campaigns: Campaign[];
  title = "Сите иницијативи"

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      var category = params['category']
      if (category == 'all') {
        this.title = "Сите иницијативи";
        this.service.getCampaings().subscribe(data => {
          this.campaigns = data
        })
      } else {
        this.service.getCampaingsByCategory(category).subscribe(data => {
          this.campaigns = data
          if (category === "ENVIRONMENT") {
            this.title = "Иницијативи од категорија Животна Средина";
          } else if (category === "ANIMALS") {
            this.title = "Иницијативи од категорија Миленици";
          } else if (category === "EDUCATION") {
            this.title = "Иницијативи од категорија Едукација";
          } else if (category === "HUMAN_RIGHTS") {
            this.title = "Иницијативи од категорија Човекови Права";
          } else if (category === "HEALTH") {
            this.title = "Иницијативи од категорија Здравје";
          } else if (category === "OTHER") {
            this.title = "Иницијативи од категорија Останатo";
          }
        })
      }
    })

  }

}
