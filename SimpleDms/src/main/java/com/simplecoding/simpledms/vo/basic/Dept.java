package com.simplecoding.simpledms.vo.basic;

import lombok.*;

/**
 * @author : KTE
 * @fileName : Dept
 * @since : 24. 10. 23.
 * description : 부서 vo
 *  TODO: DB 테이블 : 컬럼(속성), 테이블명(클래스명)
 *    DB   : 언더바 표기법 (단어_단어)
 *    Java : 낙타표기법(소문자대문자)
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Dept {
    private Integer dno; // 부서번호(기본키)
    private String dname;// 부서명
    private String loc;  // 부서위치
}
