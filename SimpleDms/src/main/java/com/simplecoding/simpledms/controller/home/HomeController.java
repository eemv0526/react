package com.simplecoding.simpledms.controller.home;


import com.simplecoding.simpledms.service.home.HomeService;
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
public class HomeController {

    private final HomeService homeService;

    //    전체 조회
//    url : 팀에서 정하면 됨(관례적으로 적용: 컨벤션 규칙)
    @GetMapping("/api/home/home")
    public ResponseEntity<?> selectHomeList(Criteria searchVO) {
        List<?> homes = homeService.selectHomeList(searchVO);
        ResultDto resultDto
                = new ResultDto(homes, searchVO.getTotalItems());
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }




    @PostMapping("/api/home/home/add")
    public ResponseEntity<?> insert(
            @RequestParam(defaultValue = "") String homeTitle,
            @RequestParam(defaultValue = "") String homeText,
            @RequestParam(defaultValue = "") String homeSummary,
            @RequestParam(defaultValue = "") String homeGenre,
            @RequestParam MultipartFile image
    ) throws Exception {
        // Home 객체 생성 (homeSummary 추가)
        Home home = new Home(homeTitle, homeText, image.getBytes(), homeSummary, homeGenre);

        // 서비스 호출
        homeService.insert(home);

        // JSON 응답 본문 추가
        Map<String, String> response = new HashMap<>();
        response.put("message", "데이터가 성공적으로 추가되었습니다.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //    TODO: 이미지 다운로드 함수
    @GetMapping("/api/home/home/{uuid}")
    public ResponseEntity<byte[]> findDownload(
            @PathVariable String uuid) throws Exception {
//		1) 상세조회 : 객체받기(첨부파일)
        Home home
                = homeService.selectHome(uuid)
                .orElseThrow(() -> new FileNotFoundException("데이터 없습니다."));

//      2) 첨부파일 jsp 전송 : 규격대로 전송(코딩 보냄)
        // 우편물 보낼때 규칙과 유사 :
        HttpHeaders headers = new HttpHeaders();                  // html 문서 객체(머리말)
        headers.setContentDispositionFormData("attachment", home.getUuid()); // 첨부파일(문서형태)
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);              // 첨부파일2(문서형태)

//       첨부파일 전송 + OK 신호 보냄
        return new ResponseEntity<byte[]>(home.getHomeData(), headers, HttpStatus.OK);
    }




    //    상세조회
    @GetMapping("/api/home/home/get/{uuid}")
    public ResponseEntity<?> selectHome(
            @PathVariable String uuid
    ) {
        Optional<Home> home
                = homeService.selectHome(uuid);
        if (home.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(home.get(), HttpStatus.OK);
    }


    @PutMapping("/api/home/home/update/{uuid}")
    public ResponseEntity<?> update(
            @PathVariable String uuid,
            @RequestParam(defaultValue = "") String homeTitle,
            @RequestParam(defaultValue = "") String homeText,
            @RequestParam(defaultValue = "") String homeSummary,
            @RequestParam(defaultValue = "") String homeGenre,
            @RequestParam(required = false) MultipartFile image
    ) throws Exception {
        byte[] imageBytes = image != null ? image.getBytes() : null;

        // Home 객체 생성 (homeSummary 포함)
        Home home = new Home(uuid, homeTitle, homeText, imageBytes, homeSummary, homeGenre);

        // 서비스 호출
        homeService.update(home);

        return new ResponseEntity<>(HttpStatus.OK);
    }




    //    삭제, 기본키(uuid)
    @DeleteMapping("/api/home/home/deletion/{uuid}")
    public ResponseEntity<?> delete(
            @PathVariable String uuid
    ) {
        homeService.delete(uuid);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }







}
