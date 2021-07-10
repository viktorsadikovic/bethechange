package mk.ukim.finki.bethechange.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.bethechange.model.User;

@Data
@NoArgsConstructor
public class ResponseDto {

    private Integer statusCode;

    private String message;

    private UserDto user;

    private String token;
}
