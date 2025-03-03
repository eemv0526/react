package com.simplecoding.simpledms.vo.advanced;

import lombok.*;

/**
 * @author : KTE
 * @fileName : FileDb
 * @since : 24. 11. 1.
 * description :
 *   TODO: TB_FILE_DB 테이블 참고
 */
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FileDb {
//    대/소문자 단축키 : ctrl + shift + u
    private String uuid;          // 기본키
    private String fileTitle;     // 제목
    private String fileContent;   // 내용
    private byte[] fileData;      // 이미지
    private String fileUrl;       // 다운로드 url

//    생성자 : fileUrl 제외한 생성자
    public FileDb(String uuid, String fileTitle, String fileContent, byte[] fileData) {
        this.uuid = uuid;
        this.fileTitle = fileTitle;
        this.fileContent = fileContent;
        this.fileData = fileData;
    }
//    생성자 : uuid, fileUrl 제외한 생성자
    public FileDb(String fileTitle, String fileContent, byte[] fileData) {
        this.fileTitle = fileTitle;
        this.fileContent = fileContent;
        this.fileData = fileData;
    }
}
