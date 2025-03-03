package com.simplecoding.simpledms.vo.basic;

import lombok.*;

/**
 * @author : KTE
 * @fileName : Emp
 * @since : 24. 10. 23.
 * description : TODO: 연습(사원: TB_EMP)
 *                 vo - mapper(전체조회) - service
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Emp {
//    대/소문자 바꾸기 단축키 : ctrl + shift + u
//    줄복사 단축키 : ctrl + d
    private Integer eno;
    private String ename;
    private String job;
    private Integer manager;
    private String hiredate;
    private Integer salary;
    private Integer commission;
    private Integer dno;
}
