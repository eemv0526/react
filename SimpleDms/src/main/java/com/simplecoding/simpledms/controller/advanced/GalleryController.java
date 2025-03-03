package com.simplecoding.simpledms.controller.advanced;

import com.simplecoding.simpledms.service.advanced.GalleryService;
import com.simplecoding.simpledms.vo.advanced.Gallery;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : GalleryController
 * @since : 24. 11. 4.
 * description :
 */
@RestController
@RequiredArgsConstructor
public class GalleryController {
    public final GalleryService galleryService;

    //    전체 조회
    @GetMapping("/api/advanced/gallery")
    public ResponseEntity<?> selectGalleryList(Criteria searchVO) {
        List<?> galleries = galleryService.selectGalleryList(searchVO);
        ResultDto resultDto
                = new ResultDto(galleries, searchVO.getTotalItems());
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    //     생성 :
    @PostMapping("/api/advanced/gallery/add")
    public ResponseEntity<?> insert(
            @RequestParam(defaultValue = "") String galleryTitle,
            @RequestParam MultipartFile image
    ) throws Exception {
        Gallery gallery = new Gallery(galleryTitle, image.getBytes());
        galleryService.insert(gallery);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    상세조회
    @GetMapping("/api/advanced/gallery/get/{uuid}")
    public ResponseEntity<?> selectGallery(
            @PathVariable String uuid
    ) {
        Optional<Gallery> gallery
                = galleryService.selectGallery(uuid);
        if (gallery.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 404
        }
        return new ResponseEntity<>(gallery.get(), HttpStatus.OK); // 200
    }

//    TODO: 연습) fileDownload 함수 작성
//       참고) FileDbController 참고

    //    TODO: 이미지 다운로드 함수
    //      springboot : json 데이터 => body 쪽에 넣어서 전송
    @GetMapping("/api/advanced/gallery/{uuid}")
    public ResponseEntity<byte[]> findDownload(
            @PathVariable String uuid) throws Exception {
//		1) 상세조회 : 객체받기(첨부파일)
        Gallery gallery
                = galleryService.selectGallery(uuid)
                .orElseThrow(() -> new FileNotFoundException("데이터 없습니다."));

//      2) 첨부파일 jsp 전송 : 규격대로 전송(코딩 보냄)
        // 우편물 보낼때 규칙과 유사 :
        HttpHeaders headers = new HttpHeaders();                  // html 문서 객체(머리말)
        headers.setContentDispositionFormData("attachment", gallery.getUuid()); // 첨부파일(문서형태)
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);              // 첨부파일2(문서형태)

//       첨부파일 전송 + OK 신호 보냄
        return new ResponseEntity<byte[]>(gallery.getGalleryData(), headers, HttpStatus.OK);
    }

    //    수정
    @PutMapping("/api/advanced/gallery/update/{uuid}")
    public ResponseEntity<?> update(
            @PathVariable String uuid,
            @RequestParam(defaultValue = "") String galleryTitle,
            @RequestParam (required = false) MultipartFile image
    ) throws Exception {
        Gallery gallery = new Gallery(uuid, galleryTitle, image.getBytes());
        galleryService.update(gallery);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    삭제, 기본키(uuid)
    @DeleteMapping("/api/advanced/gallery/deletion/{uuid}")
    public ResponseEntity<?> delete(
            @PathVariable String uuid
    ) {
        galleryService.delete(uuid);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
