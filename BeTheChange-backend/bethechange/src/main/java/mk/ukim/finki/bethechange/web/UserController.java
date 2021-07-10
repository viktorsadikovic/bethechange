package mk.ukim.finki.bethechange.web;

import lombok.AllArgsConstructor;
import mk.ukim.finki.bethechange.model.Campaign;
import mk.ukim.finki.bethechange.model.User;
import mk.ukim.finki.bethechange.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("https://bethechangeapp.netlify.app")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{email}")
    public User getAllCampaigns(@PathVariable String email) {
        return userService.findByEmail(email);
    }
}
