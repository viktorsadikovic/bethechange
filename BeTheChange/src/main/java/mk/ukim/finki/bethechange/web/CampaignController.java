package mk.ukim.finki.bethechange.web;

import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.User;
import mk.ukim.finki.bethechange.model.enumerations.Category;
import mk.ukim.finki.bethechange.service.CampaignService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaign")
@CrossOrigin("https://bethechangeapp.netlify.app")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping("/all")
    public List<Campaign> getAllCampaigns() {
        return campaignService.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Campaign> getCampaignsByCategory(@PathVariable Category category) {
        return campaignService.findAllByCategory(category);
    }

    @GetMapping("/created/{email}")
    public List<Campaign> getCampaignsCreatedByUser(@PathVariable String email) {
        return campaignService.findAllByUser(email);
    }

    @GetMapping("/joined/{email}")
    public List<Campaign> getCampaignsJoinedByUser(@PathVariable String email) {
        return campaignService.findAllJoinedBy(email);
    }

    @GetMapping("/favorites/{email}")
    public List<Campaign> getFavoriteCampaignsForUser(@PathVariable String email) {
        return campaignService.findFavoriteCampaignsFor(email);
    }

    @GetMapping("/{id}")
    public Campaign getCampaign(@PathVariable Long id) {
        return campaignService.findById(id);
    }

    @PostMapping()
    public Campaign createCampaign(@RequestBody Campaign campaign, Authentication authentication) {
        return campaignService.save(campaign, authentication);
    }

    @PutMapping("/edit")
    public Campaign editCampaign(@RequestBody Campaign campaign) {
        return campaignService.edit(campaign);
    }

    @DeleteMapping("/{id}/delete")
    public Campaign deleteCampaign(@PathVariable Long id) {
        return campaignService.delete(id);
    }

    @PostMapping("/{id}/add-to-favorites")
    public Campaign addToFavorites(@PathVariable Long id, Authentication authentication) {
        return campaignService.addToFavorites(id, authentication);
    }

    @PostMapping("/{id}/delete-from-favorites")
    public Campaign deleteFromFavorites(@PathVariable Long id, Authentication authentication) {
        return campaignService.removeFromFavorites(id, authentication);
    }

    @PostMapping("/{id}/join")
    public Campaign joinCampaign(@PathVariable Long id, Authentication authentication) {
        return campaignService.joinCampaign(id, authentication);
    }

    @PostMapping("/{id}/unjoin")
    public Campaign unjoinCampaign(@PathVariable Long id, Authentication authentication) {
        return campaignService.unjoinCampaign(id, authentication);
    }

    @GetMapping("/{id}/check-joined")
    public boolean checkJoined(@PathVariable Long id, Authentication authentication){
        return campaignService.isJoined(id, authentication);
    }

    @GetMapping("/{id}/check-favorites")
    public boolean checkFavorites(@PathVariable Long id, Authentication authentication) {
        return campaignService.isInFavorites(id, authentication);
    }

    @GetMapping("/{id}/number-joined")
    public Long getNumberOfJoinedUsersByCampaign(@PathVariable Long id) {
        return campaignService.numJoinedUsersByCampaign(id);
    }

    @GetMapping("/{id}/joined-users")
    public List<User> getJoinedUsersByCampaign(@PathVariable Long id) {
        return campaignService.getJoinedUsersByCampaign(id);
    }
}
