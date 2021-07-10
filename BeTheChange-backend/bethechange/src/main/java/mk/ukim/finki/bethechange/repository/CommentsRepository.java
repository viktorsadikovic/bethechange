package mk.ukim.finki.bethechange.repository;

import mk.ukim.finki.bethechange.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<Comment, Long> {
}
