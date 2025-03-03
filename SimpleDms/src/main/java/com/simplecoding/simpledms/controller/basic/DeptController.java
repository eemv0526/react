package com.simplecoding.simpledms.controller.basic;

import com.simplecoding.simpledms.service.basic.DeptService;
import com.simplecoding.simpledms.vo.basic.Dept;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : DeptController
 * @since : 24. 10. 24.
 * description : TODO: spring (@Controller)
 *                 springboot (@RestController)
 *  TODO: (복습) @Controller 기능 : url + jsp 결과 내보내기
 *        (신규) @RestController  : url + json 으로 결과 내보내기
 *          json 데이터 : js 객체배열 : [{},{}...]
 *  TODO: @RestController 코딩된 컨트롤러 테스트 도구
 *             (REST API 테스트 도구(프로그램))
 *     => 1) 컨트롤러 함수 앞에 아이콘 클릭 : api
 *     => 2) GET http://localhost:8000/url 앞에 실행버튼 클릭
 *     => 결과 : json 데이터(객체배열)
 *  TODO: ResponseEntity 객체
 *    => json 데이터 전송할때 , 상태코드도 같이 전송하는 객체
 *    => 목적 : 프로그램 품질 향상
 *    => new ResponseEntity<>(전송데이터, HttpStatus.상태코드)
 *    => 상태코드 예시) OK(200), NO_CONTENT(204) 등
 *    => 200번대 숫자 : 성공을 의미
 *    => 400번대 숫자 : 실패를 의미
 * TODO: spring :객체를 매개변수로 받는 어노테이션 : @ModelAttribute
 * TODO: springboot :객체를 매개변수로 받는 어노테이션 : @RequestBody
 * TODO: 로깅(디버깅) : @Slf4j 또는 @Log4j2
 *     사용법) log.debug(변수)
 */
@Slf4j
@RestController
@RequiredArgsConstructor
public class DeptController {

    private final DeptService deptService; // 서비스 객체

//    전체 조회
//    http://localhost:8000/api/basic/dept?pageIndex=1&recordCountPerPage=3
    @GetMapping("/api/basic/dept")
    public ResponseEntity<?> selectDeptList(Criteria searchVO) {
        log.info("테스트");
        List<?> depts = deptService.selectDeptList(searchVO);
//      TODO: depts(배열) 1개 + 총건수 1개 -> 박스포장용 객체
//          객체생성(택배박스: DTO 객체) : 속성필드 (배열), 속성필드(총건수)
        ResultDto resultDto
                = new ResultDto(depts, searchVO.getTotalItems());
//      TODO: 상태코드 : HttpStatus.OK, NO_CONTENT ...
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

//    부서 생성
//    TODO: spring :객체를 매개변수로 받는 어노테이션 : @ModelAttribute
//    TODO: springboot :객체를 매개변수로 받는 어노테이션 : @RequestBody
    @PostMapping("/api/basic/dept")
    public ResponseEntity<?> insert(
           @RequestBody Dept dept
    ) {
        deptService.insert(dept);

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    부서 상세조회
//    TODO: 쿼리스트링 : http://localhost:8000/dept?dno=10
//         spring   : 어노테이션 : @RequestParam
//        파라메터방식 : http://localhost:8000/dept/10
//       springboot :  어노테이션 : @PathVariable
    @GetMapping("/api/basic/dept/{dno}")
    public ResponseEntity<?> selectDept(
            @PathVariable int dno
    ) {
        Optional<Dept> dept = deptService.selectDept(dno);
//        에러처리 : dept.isEmpty() : dept 가 null 이면?
        if(dept.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
//        TODO: dept.get() => 옵셔널에서 꺼내기 함수
        return new ResponseEntity<>(dept.get(), HttpStatus.OK);
    }

//    부서 수정
//    TODO: spring : CUD => @PostMapping("/url")
//    TODO: springboot : C(생성) => @PostMapping("/url")
//                       U(수정) => @PutMapping("/url")
//                       D(삭제) => @DeleteMapping("/url")
    @PutMapping("/api/basic/dept/{dno}")
    public ResponseEntity<?> update(
        @PathVariable int dno,
        @RequestBody Dept dept
    ) {
        deptService.update(dept);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    부서 삭제, 기본키(dno)
    @DeleteMapping("/api/basic/dept/deletion/{dno}")
    public ResponseEntity<?> delete(
            @PathVariable int dno
    ) {
        deptService.delete(dno);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }
}









