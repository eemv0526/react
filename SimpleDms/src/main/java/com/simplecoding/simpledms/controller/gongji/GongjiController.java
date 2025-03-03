package com.simplecoding.simpledms.controller.gongji;


import com.simplecoding.simpledms.service.gongji.GongjiService;
import com.simplecoding.simpledms.vo.basic.Dept;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import com.simplecoding.simpledms.vo.gongji.Gongji;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GongjiController {


    private final GongjiService gongjiService;

    //    전체 조회
//    http://localhost:8000/api/basic/dept?pageIndex=1&recordCountPerPage=3
    @GetMapping("/api/gongji/gongji")
    public ResponseEntity<?> selectGongjiList(Criteria searchVO) {
        log.info("테스트");
        List<?> gongjis = gongjiService.selectGongjiList(searchVO);
//      TODO: depts(배열) 1개 + 총건수 1개 -> 박스포장용 객체
//          객체생성(택배박스: DTO 객체) : 속성필드 (배열), 속성필드(총건수)
        ResultDto resultDto
                = new ResultDto(gongjis, searchVO.getTotalItems());
//      TODO: 상태코드 : HttpStatus.OK, NO_CONTENT ...
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    //    부서 생성
//    TODO: spring :객체를 매개변수로 받는 어노테이션 : @ModelAttribute
//    TODO: springboot :객체를 매개변수로 받는 어노테이션 : @RequestBody
    @PostMapping("/api/gongji/gongji/add")
    public ResponseEntity<?> insert(
            @RequestBody Gongji gongji
    ) {
        gongjiService.insert(gongji);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    부서 상세조회
//    TODO: 쿼리스트링 : http://localhost:8000/dept?dno=10
//         spring   : 어노테이션 : @RequestParam
//        파라메터방식 : http://localhost:8000/dept/10
//       springboot :  어노테이션 : @PathVariable
    @GetMapping("/api/gongji/gongji/{gno}")
    public ResponseEntity<?> selectGongji(
            @PathVariable int gno
    ) {
        Optional<Gongji> gongji = gongjiService.selectGongji(gno);
//        에러처리 : dept.isEmpty() : dept 가 null 이면?
        if(gongji.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
//        TODO: dept.get() => 옵셔널에서 꺼내기 함수
        return new ResponseEntity<>(gongji.get(), HttpStatus.OK);
    }

    //    부서 수정
//    TODO: spring : CUD => @PostMapping("/url")
//    TODO: springboot : C(생성) => @PostMapping("/url")
//                       U(수정) => @PutMapping("/url")
//                       D(삭제) => @DeleteMapping("/url")
    @PutMapping("/api/gongji/gongji/update/{gno}")
    public ResponseEntity<?> update(
            @PathVariable int gno,
            @RequestBody Gongji gongji
    ) {
        gongjiService.update(gongji);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    부서 삭제, 기본키(dno)
    @DeleteMapping("/api/gongji/gongji/deletion/{gno}")
    public ResponseEntity<?> delete(
            @PathVariable int gno
    ) {
        gongjiService.delete(gno);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }
}




