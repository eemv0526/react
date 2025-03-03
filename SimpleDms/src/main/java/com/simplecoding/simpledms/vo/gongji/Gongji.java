package com.simplecoding.simpledms.vo.gongji;


import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Gongji {


    private Integer gno;           // 공지사항 번호 (NUMBER 매핑)
    private String title;          // 제목 (VARCHAR2(200 BYTE) 매핑)
    private String content;        // 내용 (CLOB 매핑)
    private Timestamp insertTime; // 등록 시간 (TIMESTAMP 매핑)



}
