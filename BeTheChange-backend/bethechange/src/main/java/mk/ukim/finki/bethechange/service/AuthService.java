package mk.ukim.finki.bethechange.service;

import mk.ukim.finki.bethechange.model.User;
import mk.ukim.finki.bethechange.model.dto.LoginDto;
import mk.ukim.finki.bethechange.model.dto.ResponseDto;
import org.springframework.security.core.Authentication;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

public interface AuthService {
    ResponseDto register(User user);

    ResponseDto login(LoginDto loginDto);

    ResponseDto logout(HttpServletRequest request) throws ServletException;

    ResponseDto getCurrentUser(Authentication authentication);
}
