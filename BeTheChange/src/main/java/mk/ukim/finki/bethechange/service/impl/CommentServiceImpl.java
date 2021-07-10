package mk.ukim.finki.bethechange.service.impl;

import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.Comment;
import mk.ukim.finki.bethechange.repository.CampaignRepository;
import mk.ukim.finki.bethechange.repository.CommentsRepository;
import mk.ukim.finki.bethechange.service.CampaignService;
import mk.ukim.finki.bethechange.service.CommentService;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentsRepository commentsRepository;
    private final CampaignRepository campaignRepository;

    public CommentServiceImpl(CommentsRepository commentsRepository, CampaignRepository campaignRepository) {
        this.commentsRepository = commentsRepository;
        this.campaignRepository = campaignRepository;
    }

    @Override
    public Comment findById(Long id) {
        return this.commentsRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @Override
    public Comment save(Comment comment) {
        return this.commentsRepository.save(comment);
    }

    @Override
    public Campaign edit(Long campaignId, Long id, Comment comment) {
        Comment existingComment = this.findById(comment.getId());

        existingComment.setContent(comment.getContent());
        this.commentsRepository.save(comment);

        return campaignRepository.findById(campaignId).orElseThrow(RuntimeException::new);
    }

    @Override
    public Comment delete(Long id) {
        Comment comment = findById(id);

        this.commentsRepository.delete(comment);

        return comment;
    }
}
