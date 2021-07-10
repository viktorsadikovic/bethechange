import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaign, Comment, User } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  apiCampaign = "https://bethechangebackend.herokuapp.com/api/campaign/"
  apiComment = "https://bethechangebackend.herokuapp.com/api/comment/"
  apiAuth = "https://bethechangebackend.herokuapp.com/auth/"
  apiUser = "https://bethechangebackend.herokuapp.com/user/"


  getCampaings() {
    return this.http.get<Campaign[]>(this.apiCampaign + "all");
  }

  getCampaingsByCategory(category) {
    return this.http.get<Campaign[]>(this.apiCampaign + "category/" + category);
  }

  getCampaignsCreatedBy(email) {
    return this.http.get<Campaign[]>(this.apiCampaign + "created/" + email)
  }

  getFavoriteCampaignsFor(email) {
    return this.http.get<Campaign[]>(this.apiCampaign + "favorites/" + email)
  }

  getJoinedCampaignsBy(email) {
    return this.http.get<Campaign[]>(this.apiCampaign + "joined/" + email)
  }

  getSingleCampaign(id) {
    return this.http.get<Campaign>(this.apiCampaign + id);
  }

  createCampaign(campaign) {
    return this.http.post<Campaign>(this.apiCampaign, campaign);
  }

  editCampaign(id, campaign) {
    return this.http.put(this.apiCampaign + "edit", campaign);
  }

  deleteCampaign(id) {
    return this.http.delete(this.apiCampaign + id + "/delete");
  }

  addComment(id, comment) {
    return this.http.post<Campaign>(this.apiComment + id + "/add", comment);
  }

  deleteComment(campaignId, id) {
    return this.http.delete(this.apiComment + campaignId + "/delete/" + id);
  }

  editComment(campaignId, id, comment) {
    return this.http.post<Campaign>(this.apiComment + campaignId + "/edit/" + id, comment);
  }

  joinCampaign(id) {
    return this.http.post<Campaign>(this.apiCampaign + id + "/join", null);
  }

  unjoinCampaign(id) {
    return this.http.post<Campaign>(this.apiCampaign + id + "/unjoin", null);
  }

  checkFavorites(id) {
    return this.http.get<boolean>(this.apiCampaign + id + "/check-favorites");
  }

  checkJoined(id) {
    return this.http.get<boolean>(this.apiCampaign + id + "/check-joined");
  }

  addToFavorites(id) {
    return this.http.post<Campaign>(this.apiCampaign + id + "/add-to-favorites", null);
  }

  removeFromFavorites(id) {
    return this.http.post<Campaign>(this.apiCampaign + id + "/delete-from-favorites", null);
  }

  getNumberOfJoinedUsersByCampaign(id) {
    return this.http.get<number>(this.apiCampaign + id + "/number-joined");
  }

  getJoinedUsersByCampaign(id) {
    return this.http.get<User[]>(this.apiCampaign + id + "/joined-users")
  }

  getUser(email) {
    return this.http.get<User>(this.apiUser + email);
  }
}
