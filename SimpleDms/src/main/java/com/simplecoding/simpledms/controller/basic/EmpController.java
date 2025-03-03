package com.simplecoding.simpledms.controller.basic;

import com.simplecoding.simpledms.service.basic.EmpService;
import com.simplecoding.simpledms.vo.basic.Emp;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : EmpController
 * @since : 24. 10. 24.
 * description : TODO: 연습 (전체조회)
 * 함수명 : selectEmpList
 * url   : /api/basic/emp
 */
@RestController
@RequiredArgsConstructor
public class EmpController {

    private final EmpService empService;

    //    전체조회
//    자동 정렬 단축키 : ctrl + alt + l
    @GetMapping("/api/basic/emp")
    public ResponseEntity<?> selectEmpList(Criteria searchVO) {
        List<?> emps = empService.selectEmpList(searchVO);

//      TODO: depts(배열) 1개 + 총건수 1개 -> 박스포장용 객체
//          객체생성(택배박스: DTO 객체) : 속성필드 (배열), 속성필드(총건수)
        ResultDto resultDto
                = new ResultDto(emps, searchVO.getTotalItems());

//      TODO: 상태코드 : HttpStatus.OK, NO_CONTENT ...
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    //    사원생성
    @PostMapping("/api/basic/emp")
    public ResponseEntity<?> insert(
            @RequestBody Emp emp
    ) {
        empService.insert(emp);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    상세조회
    @GetMapping("/api/basic/emp/{eno}")
    public ResponseEntity<?> selectEmp(
            @PathVariable int eno
    ) {
        Optional<Emp> emp = empService.selectEmp(eno);
        if (emp.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(emp.get(), HttpStatus.OK);
    }

    //    사원 수정
    @PutMapping("/api/basic/emp/{eno}")
    public ResponseEntity<?> update(
            @PathVariable int eno,
            @RequestBody Emp emp
    ) {
        empService.update(emp);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    사원 삭제
    @DeleteMapping("/api/basic/emp/deletion/{eno}")
    public ResponseEntity<?> delete(
            @PathVariable int eno
    ) {
        empService.delete(eno);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
