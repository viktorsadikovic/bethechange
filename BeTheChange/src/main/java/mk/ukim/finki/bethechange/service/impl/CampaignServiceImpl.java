package mk.ukim.finki.bethechange.service.impl;

import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.Comment;
import mk.ukim.finki.bethechange.model.User;
import mk.ukim.finki.bethechange.model.enumerations.Category;
import mk.ukim.finki.bethechange.model.exception.CampaignNotFound;
import mk.ukim.finki.bethechange.repository.CampaignRepository;
import mk.ukim.finki.bethechange.service.CampaignService;
import mk.ukim.finki.bethechange.service.CommentService;
import mk.ukim.finki.bethechange.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;
    private final CommentService commentService;
    private final UserService userService;

    public CampaignServiceImpl(CampaignRepository campaignRepository, CommentService commentService, UserService userService) {
        this.campaignRepository = campaignRepository;
        this.commentService = commentService;
        this.userService = userService;
    }

    @Override
    public List<Campaign> findAll() {
        return campaignRepository.findAll();
    }

    @Override
    public List<Campaign> findAllByCategory(Category category) {
        return campaignRepository.findAllByCategory(category);
    }

    @Override
    public List<Campaign> findAllByUser(String email) {
        return campaignRepository.findAllByCreator(email);
    }

    @Override
    public List<Campaign> findAllJoinedBy(String email) {
        return userService.findByEmail(email).getJoinedCampaigns();
    }

    @Override
    public List<Campaign> findFavoriteCampaignsFor(String email) {
        return userService.findByEmail(email).getFavoriteCampaigns();
    }

    @Override
    public Campaign findById(Long id) {
        return campaignRepository.findById(id).orElseThrow(() -> new CampaignNotFound(id));
    }

    @Override
    public Campaign save(Campaign campaign, Authentication authentication) {
        String creator = (String) authentication.getPrincipal();
        campaign.setCreator(creator);
        campaign.setCreatedAt(LocalDateTime.now());

        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign edit(Campaign campaign) {
        Campaign existingCampaign = findById(campaign.getId());

        existingCampaign.setTitle(campaign.getTitle());
        existingCampaign.setDescription(campaign.getDescription());
        existingCampaign.setLocation(campaign.getLocation());
        existingCampaign.setQuorum(campaign.getQuorum());
        existingCampaign.setTime(campaign.getTime());

        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign addComment(Long id, Comment comment, Authentication authentication) {
       Campaign campaign = findById(id);
       String submitter = (String) authentication.getPrincipal();

       comment.setSubmitter(submitter);
       comment.setSubmissionTime(LocalDateTime.now());
       campaign.getComments().add(comment);
       edit(campaign);

        return campaign;
    }

    @Override
    public Campaign removeComment(Long campaignId, Long commentId) {
        Campaign campaign = findById(campaignId);

        campaign.getComments().removeIf(comment -> comment.getId().equals(commentId));

        return campaignRepository.save(campaign);
    }

    @Override
    public Campaign delete(Long id) {
       Campaign campaign = findById(id);

       campaign.getComments().forEach(comment -> commentService.delete(comment.getId()));
       this.campaignRepository.delete(campaign);

       return campaign;
    }

    @Override
    public Long numJoinedUsersByCampaign(Long id) {
        User user2 = userService.findByEmail("viktorsadikovic1@gmail.com");
        return userService.findAll()
                .stream()
                .filter(user -> user.getJoinedCampaigns().stream().anyMatch(campaign -> campaign.getId().equals(id)))
                .count();
    }

    @Override
    public List<User> getJoinedUsersByCampaign(Long id) {
        return userService.findAll()
                .stream()
                .filter(user -> user.getJoinedCampaigns().stream().anyMatch(campaign -> campaign.getId().equals(id)))
                .collect(Collectors.toList());
    }

    @Override
    public Campaign joinCampaign(Long id, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userService.findByEmail(email);
        Campaign campaign = findById(id);

        if(!user.getJoinedCampaigns().contains(campaign)) {
            user.getJoinedCampaigns().add(campaign);
            userService.edit(user);
        }

        return campaign;
    }

    @Override
    public Campaign unjoinCampaign(Long id, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userService.findByEmail(email);
        Campaign campaign = findById(id);

        user.getJoinedCampaigns().remove(campaign);
        userService.edit(user);

        return campaign;
    }

    @Override
    public Campaign addToFavorites(Long id, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userService.findByEmail(email);
        Campaign campaign = findById(id);

        if(!user.getFavoriteCampaigns().contains(campaign)){
            user.getFavoriteCampaigns().add(campaign);
            userService.edit(user);
        }

        return campaign;
    }

    @Override
    public Campaign removeFromFavorites(Long id, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userService.findByEmail(email);
        Campaign campaign = findById(id);

        user.getFavoriteCampaigns().remove(campaign);
        userService.edit(user);

        return campaign;
    }

    @Override
    public boolean isJoined(Long id, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userService.findByEmail(email);
        Campaign campaign = findById(id);

        return user.getJoinedCampaigns().contains(campaign);
    }

    @Override
    public boolean isInFavorites(Long id, Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userService.findByEmail(email);
        Campaign campaign = findById(id);

        return user.getFavoriteCampaigns().contains(campaign);
    }
}
