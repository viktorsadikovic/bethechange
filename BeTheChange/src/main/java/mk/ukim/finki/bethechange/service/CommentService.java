package mk.ukim.finki.bethechange.service;

import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.Comment;

public interface CommentService {
    Comment findById(Long id);

    Comment save(Comment comment);

    Campaign edit(Long campaignId, Long id, Comment comment);

    Comment delete(Long id);
}
