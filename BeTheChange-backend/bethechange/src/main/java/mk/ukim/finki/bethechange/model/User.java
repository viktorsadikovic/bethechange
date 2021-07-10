package mk.ukim.finki.bethechange.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "bethechange_users")
public class User {

    @Id
    private String email;

    private String name;

    private String surname;

    private String password;

    private String profilePictureUrl;

    private String phone;

    private String address;

    @ManyToMany
    private List<Campaign> favoriteCampaigns;

    @ManyToMany
    private List<Campaign> joinedCampaigns;

    public User(String email, String password, String name, String surname, String profilePictureUrl, String phone, String address) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.address = address;
        this.profilePictureUrl = profilePictureUrl;
        this.favoriteCampaigns = new ArrayList<>();
        this.joinedCampaigns = new ArrayList<>();
    }
}
