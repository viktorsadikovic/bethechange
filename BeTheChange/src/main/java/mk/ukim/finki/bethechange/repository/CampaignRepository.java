package mk.ukim.finki.bethechange.repository;

import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.enumerations.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    List<Campaign> findAllByCreator(String email);
    List<Campaign> findAllByCategory(Category category);
}

