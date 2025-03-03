package com.simplecoding.simpledms.controller.advanced;

import com.simplecoding.simpledms.service.advanced.FileDbService;
import com.simplecoding.simpledms.vo.advanced.FileDb;
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
 * @fileName : FileDbController
 * @since : 24. 11. 1.
 * description :
 */
@RestController
@RequiredArgsConstructor
public class FileDbController {
    private final FileDbService fileDbService;

    //    전체 조회
//    url : 팀에서 정하면 됨(관례적으로 적용: 컨벤션 규칙)
    @GetMapping("/api/advanced/fileDb")
    public ResponseEntity<?> selectFileDbList(Criteria searchVO) {
        List<?> fileDbs = fileDbService.selectFileDbList(searchVO);
        ResultDto resultDto
                = new ResultDto(fileDbs, searchVO.getTotalItems());
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    //    FileDb 생성 : fileTitle, fileContent, image(업로드)
//    TODO: 객체 : @RequestBody, @ModelAttribute(jsp 용) (x)
//          변수 : @RequestParam(파일업로드, O), @PathVariable(x)
    @PostMapping("/api/advanced/fileDb/add")
    public ResponseEntity<?> insert(
            @RequestParam(defaultValue = "") String fileTitle,
            @RequestParam(defaultValue = "") String fileContent,
            @RequestParam MultipartFile image
    ) throws Exception {
        FileDb fileDb = new FileDb(fileTitle, fileContent, image.getBytes());
        fileDbService.insert(fileDb);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    TODO: 이미지 다운로드 함수
    //      springboot : json 데이터 => body 쪽에 넣어서 전송
    @GetMapping("/api/advanced/fileDb/{uuid}")
    public ResponseEntity<byte[]> findDownload(
            @PathVariable String uuid) throws Exception {
//		1) 상세조회 : 객체받기(첨부파일)
        FileDb fileDb
                = fileDbService.selectFileDb(uuid)
                .orElseThrow(() -> new FileNotFoundException("데이터 없습니다."));

//      2) 첨부파일 jsp 전송 : 규격대로 전송(코딩 보냄)
        // 우편물 보낼때 규칙과 유사 :
        HttpHeaders headers = new HttpHeaders();                  // html 문서 객체(머리말)
        headers.setContentDispositionFormData("attachment", fileDb.getUuid()); // 첨부파일(문서형태)
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);              // 첨부파일2(문서형태)

//       첨부파일 전송 + OK 신호 보냄
        return new ResponseEntity<byte[]>(fileDb.getFileData(), headers, HttpStatus.OK);
    }

    //    상세조회
    @GetMapping("/api/advanced/fileDb/get/{uuid}")
    public ResponseEntity<?> selectFileDb(
            @PathVariable String uuid
    ) {
        Optional<FileDb> fileDb
                = fileDbService.selectFileDb(uuid);
        if (fileDb.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(fileDb.get(), HttpStatus.OK);
    }

    //    수정
    @PutMapping("/api/advanced/fileDb/update/{uuid}")
    public ResponseEntity<?> update(
            @PathVariable String uuid,
            @RequestParam(defaultValue = "") String fileTitle,
            @RequestParam(defaultValue = "") String fileContent,
            @RequestParam (required = false) MultipartFile image
    ) throws Exception {
        FileDb fileDb = new FileDb(uuid, fileTitle, fileContent, image.getBytes());
        fileDbService.update(fileDb);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    삭제, 기본키(uuid)
    @DeleteMapping("/api/advanced/fileDb/deletion/{uuid}")
    public ResponseEntity<?> delete(
            @PathVariable String uuid
    ) {
        fileDbService.delete(uuid);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

