package com.simplecoding.simpledms.controller.comic;


import com.simplecoding.simpledms.service.comic.ComicService;
import com.simplecoding.simpledms.vo.comic.Comic;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import com.simplecoding.simpledms.vo.home.Home;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ComicController {

    private final ComicService comicService;


    //    전체 조회

    @GetMapping("/api/comic/comic")
    public ResponseEntity<?> selectComicList(Criteria searchVO) {
        List<?> comics = comicService.selectComicList(searchVO);
        ResultDto resultDto
                = new ResultDto(comics, searchVO.getTotalItems());
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }


    @PostMapping("/api/comic/comic/add")
    public ResponseEntity<?> insert(
            @RequestParam(defaultValue = "") String bookTitle,
            @RequestParam(defaultValue = "") String bookContent,

            @RequestParam MultipartFile image,
            @RequestParam(defaultValue = "") int bookPrice

    ) throws Exception {
        // Home 객체 생성 (homeSummary 추가)
        Comic comic = new Comic(bookTitle, bookContent,  image.getBytes(), bookPrice);

        // 서비스 호출
        comicService.insert(comic);

        // JSON 응답 본문 추가
        Map<String, String> response = new HashMap<>();
        response.put("message", "데이터가 성공적으로 추가되었습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //    TODO: 이미지 다운로드 함수
    @GetMapping("/api/comic/comic/{uuid}")
    public ResponseEntity<byte[]> findDownload(
            @PathVariable String uuid) throws Exception {
//		1) 상세조회 : 객체받기(첨부파일)
        Comic comic
                = comicService.selectComic(uuid)
                .orElseThrow(() -> new FileNotFoundException("데이터 없습니다."));

//      2) 첨부파일 jsp 전송 : 규격대로 전송(코딩 보냄)
        // 우편물 보낼때 규칙과 유사 :
        HttpHeaders headers = new HttpHeaders();                  // html 문서 객체(머리말)
        headers.setContentDispositionFormData("attachment", comic.getUuid()); // 첨부파일(문서형태)
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);              // 첨부파일2(문서형태)

//       첨부파일 전송 + OK 신호 보냄
        return new ResponseEntity<byte[]>(comic.getBookData(), headers, HttpStatus.OK);
    }



    //    상세조회
    @GetMapping("/api/comic/comic/get/{uuid}")
    public ResponseEntity<?> selectHome(
            @PathVariable String uuid
    ) {
        Optional<Comic> comic
                = comicService.selectComic(uuid);
        if (comic.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(comic.get(), HttpStatus.OK);
    }


    @PutMapping("/api/comic/comic/update/{uuid}")
    public ResponseEntity<?> update(
            @PathVariable String uuid,
            @RequestParam(defaultValue = "") String bookTitle,
            @RequestParam(defaultValue = "") String bookContent,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(defaultValue = "") int bookPrice
    ) throws Exception {
        byte[] imageBytes = image != null ? image.getBytes() : null;

        // Home 객체 생성 (homeSummary 포함)
        Comic comic = new Comic(uuid, image.getBytes(), bookContent,  bookTitle, bookPrice);

        // 서비스 호출
        comicService.update(comic);

        return new ResponseEntity<>(HttpStatus.OK);
    }




    //    삭제, 기본키(uuid)
    @DeleteMapping("/api/comic/comic/deletion/{uuid}")
    public ResponseEntity<?> delete(
            @PathVariable String uuid
    ) {
        comicService.delete(uuid);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }






}
