package com.simplecoding.simpledms.vo.comic;


import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Comic {


    private String uuid;          // 기본키
    private String bookTitle;     // 제목
    private String bookContent;   // 내용
    private byte[] bookData;      // 이미지
    private String bookUrl;       // 다운로드 url
    private int bookPrice;


    public Comic(String uuid, byte[] bookData, String bookContent, String bookTitle, int bookPrice) {
        this.uuid = uuid;
        this.bookData = bookData;
        this.bookContent = bookContent;
        this.bookTitle = bookTitle;
        this.bookPrice = bookPrice;
    }

    public Comic(String bookTitle, String bookContent, byte[] bookData, int bookPrice) {
        this.bookTitle = bookTitle;
        this.bookContent = bookContent;
        this.bookData = bookData;
        this.bookPrice = bookPrice;
    }






}
