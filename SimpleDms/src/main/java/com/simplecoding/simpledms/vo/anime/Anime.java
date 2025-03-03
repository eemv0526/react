package com.simplecoding.simpledms.vo.anime;


import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Anime {


    private int animeId;
    private String uuid;
    private String email;
    private Integer rating;
    private String animeComment;
    private Timestamp createAt;



}
