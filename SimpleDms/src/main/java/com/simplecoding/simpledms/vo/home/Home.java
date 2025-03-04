package com.simplecoding.simpledms.vo.home;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Home {

    private String uuid;          // 기본키
    private String homeTitle;     // 제목
    private String homeText;   // 내용
    private byte[] homeData;      // 이미지
    private String homeUrl;       // 다운로드 url
    private String homeSummary;  // 줄거리
    private String homeGenre; // 장르






    // 생성자: homeUrl 제외한 생성자
    public Home(String uuid, String homeTitle, String homeText, byte[] homeData, String homeSummary, String homeGenre) {
        this.uuid = uuid;
        this.homeTitle = homeTitle;
        this.homeText = homeText;
        this.homeData = homeData;
        this.homeSummary = homeSummary;
        this.homeGenre = homeGenre;
    }

    // 생성자: uuid, homeUrl 제외한 생성자
    public Home(String homeTitle, String homeText, byte[] homeData, String homeSummary, String homeGenre) {
        this.homeTitle = homeTitle;
        this.homeText = homeText;
        this.homeData = homeData;
        this.homeSummary = homeSummary;
        this.homeGenre = homeGenre;
    }


}
