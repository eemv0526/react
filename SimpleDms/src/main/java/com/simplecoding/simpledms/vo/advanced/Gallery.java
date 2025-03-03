package com.simplecoding.simpledms.vo.advanced;

import lombok.*;

/**
 * @author : KTE
 * @fileName : Gallery
 * @since : 24. 11. 1.
 * description : (연습) TB_GALLERY(4개) 참고해서
 *         vo -> mapper -> service -> controller
 *         전체조회 기능 구현
 */
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Gallery {
    private String uuid; // 기본키
    private String galleryTitle;
    private byte[] galleryData;
    private String galleryFileUrl;
    //    생성자 : galleryFileUrl 제외한 생성자
    public Gallery(String uuid, String galleryTitle, byte[] galleryData) {
        this.uuid = uuid;
        this.galleryTitle = galleryTitle;
        this.galleryData = galleryData;
    }
    //    생성자 : uuid, galleryFileUrl 제외한 생성자
    public Gallery(String galleryTitle, byte[] galleryData) {
        this.galleryTitle = galleryTitle;
        this.galleryData = galleryData;
    }
}
