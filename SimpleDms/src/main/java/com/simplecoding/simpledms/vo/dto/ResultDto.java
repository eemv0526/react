package com.simplecoding.simpledms.vo.dto;

import lombok.*;

import java.util.List;

/**
 * @author : KTE
 * @fileName : ResultDto
 * @since : 24. 10. 25.
 * description : 박스포장용 객체(DTO 객체)
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResultDto {
    
    // 배열
    private List<?> results;
    // 총건수
    private Integer totalCount;






}
