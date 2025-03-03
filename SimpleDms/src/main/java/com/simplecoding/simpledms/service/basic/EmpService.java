package com.simplecoding.simpledms.service.basic;

import com.simplecoding.simpledms.mapper.basic.EmpMapper;
import com.simplecoding.simpledms.vo.basic.Emp;
import com.simplecoding.simpledms.vo.common.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : EmpService
 * @since : 24. 10. 24.
 * description :
 * DI : 객체를 받아오는것 (스프링 실행버튼 누르면 객체를 생성)
 *   TODO: 1) @Autowired : 변수 DI
 *         2) final + @RequiredArgsConstructor : 생성자 DI
 *           (추천)
 */
@Service
@RequiredArgsConstructor
public class EmpService {
    private final EmpMapper empMapper;

    //    전체 조회 + 총건수(searchVO 의 totalItems 에 저장)
    public List<?> selectEmpList(Criteria searchVO) {
        List<?> page = empMapper.selectEmpList(searchVO);

//        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = empMapper.selectEmpListTotCnt(searchVO);
        searchVO.setTotalItems(count);

        return page;
    }

    //    TODO: 사원생성
    public void insert(Emp emp) {
        empMapper.insert(emp);
    }

    //    TODO: 상세조회
    public Optional<Emp> selectEmp(int eno) {
        return empMapper.selectEmp(eno);
    }

    //    TODO: 사원수정
    public void update(Emp emp) {
        empMapper.update(emp);
    }

    //    TODO: 사원삭제, 기본키(eno)
    public void delete(int eno) {
        empMapper.delete(eno);
    }
}








