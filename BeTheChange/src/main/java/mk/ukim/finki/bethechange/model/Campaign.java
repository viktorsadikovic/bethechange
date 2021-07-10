package mk.ukim.finki.bethechange.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.bethechange.model.enumerations.Category;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String location;

    @Enumerated(EnumType.STRING)
    private Category category;

    private LocalDateTime time;

    private LocalDateTime createdAt;

    private int quorum;

    private String image;

    private String creator;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Comment> comments;


}
