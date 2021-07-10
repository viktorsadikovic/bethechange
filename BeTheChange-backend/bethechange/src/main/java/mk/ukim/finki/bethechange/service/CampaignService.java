package mk.ukim.finki.bethechange.service;

import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.Comment;
import mk.ukim.finki.bethechange.model.User;
import mk.ukim.finki.bethechange.model.enumerations.Category;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CampaignService {

    List<Campaign> findAll();

    List<Campaign> findAllByCategory(Category category);

    List<Campaign> findAllByUser(String email);

    List<Campaign> findAllJoinedBy(String email);

    List<Campaign> findFavoriteCampaignsFor(String email);

    Campaign findById(Long id);

    Campaign save(Campaign campaign, Authentication authentication);

    Campaign edit(Campaign campaign);

    Campaign addComment(Long id, Comment comment, Authentication authentication);

    Campaign removeComment(Long campaignId, Long commentId);

    Campaign delete(Long id);

    Long numJoinedUsersByCampaign(Long id);

    List<User> getJoinedUsersByCampaign(Long id);

    Campaign joinCampaign(Long id, Authentication authentication);

    Campaign unjoinCampaign(Long id, Authentication authentication);

    Campaign addToFavorites(Long id, Authentication authentication);

    Campaign removeFromFavorites(Long id, Authentication authentication);

    boolean isJoined(Long id, Authentication authentication);
    boolean isInFavorites(Long id, Authentication authentication);
}
