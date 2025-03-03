package com.simplecoding.simpledms.vo.dto;

import lombok.*;

/**
 * @author : KTE
 * @fileName : UserReqDto
 * @since : 24. 11. 13.
 * description :  TODO: 유저 택배상자(프론트 => 백엔드) : 로그인 진행 시 보안 때문에 (조회) POST 방식 사용 : 객체(유저 택배상자:DTO)
 *                       => GET 방식 : (단점) url에 정보 노출
 *                     
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserReqDto {

    private String email; // ID
    private String password; // PASSWORD



}
