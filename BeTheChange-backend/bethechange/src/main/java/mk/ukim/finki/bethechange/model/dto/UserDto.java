package mk.ukim.finki.bethechange.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.User;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class UserDto {

    private String email;

    private String password;

    private String name;

    private String surname;

    private String profilePictureUrl;

    private List<Long> favoriteCampigns;


    public UserDto(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.profilePictureUrl = user.getProfilePictureUrl();

        if (user.getFavoriteCampaigns() != null) {
            this.favoriteCampigns = user.getFavoriteCampaigns()
                    .stream()
                    .map(Campaign::getId)
                    .collect(Collectors.toList());
        }

    }
}
