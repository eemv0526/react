package com.simplecoding.simpledms.vo.dto;

import lombok.*;

/**
 * @author : KTE
 * @fileName : UserResDto
 * @since : 24. 11. 13.
 * description : TODO: 유저 택배상자(백엔드 결과 => 프론트)
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResDto {

    private String accessToken; // 웹 토큰

    private String tokenType = "Bearer"; // 토큰 타입 : 항상 "Bearer" 고정

    private String email; // 유저 이메일
    private String codeName; // 권한명


    // 생성자 : accessToken | email | codeName
    public UserResDto(String accessToken, String email, String codeName) {
        this.accessToken = accessToken;
        this.email = email;
        this.codeName = codeName;
    }

    // TODO: 비밀번호(password)랑 이름(name)도 보낼 수 있지만 필요 없으면 안 보내도 됨

}
