package mk.ukim.finki.bethechange.web;

import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.Comment;
import mk.ukim.finki.bethechange.service.CampaignService;
import mk.ukim.finki.bethechange.service.CommentService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin("https://bethechangeapp.netlify.app")
public class CommentController {
    private final CommentService commentService;
    private final CampaignService campaignService;

    public CommentController(CommentService commentService, CampaignService campaignService) {
        this.commentService = commentService;
        this.campaignService = campaignService;
    }

    @PostMapping("{campaignId}/add")
    public Campaign addComment(@PathVariable Long campaignId, @RequestBody Comment comment, Authentication authentication){
        return campaignService.addComment(campaignId, comment, authentication);
    }

    @PostMapping("{campaignId}/edit/{id}")
    public Campaign editComment(@PathVariable Long campaignId, @PathVariable Long id, @RequestBody Comment comment, Authentication authentication){
        return commentService.edit(campaignId, id, comment);
    }

    @DeleteMapping("{campaignId}/delete/{id}")
    public Campaign deleteComment(@PathVariable Long campaignId, @PathVariable Long id) {
        return campaignService.removeComment(campaignId, id);
    }
}
