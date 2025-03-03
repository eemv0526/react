package com.simplecoding.simpledms.vo.auth;

import lombok.*;

/**
 * @author : KTE
 * @fileName : Member
 * @since : 24. 11. 11.
 * description :
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Member {

    private String email;
    private String password;
    private String name;
    private String codeName;

}
