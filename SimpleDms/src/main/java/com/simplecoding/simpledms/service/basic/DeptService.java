package com.simplecoding.simpledms.service.basic;

import com.simplecoding.simpledms.mapper.basic.DeptMapper;
import com.simplecoding.simpledms.vo.basic.Dept;
import com.simplecoding.simpledms.vo.common.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : DeptService
 * @since : 24. 10. 23.
 * description : 부서 서비스
 *   TODO: 1) DI 방법 : @Autowired 사용 (변수 DI)
 *         2) final 상수 + @RequiredArgsConstructor
 *            (생성자 DI) : springboot 추천
 */
@Service
@RequiredArgsConstructor
public class DeptService {
    private final DeptMapper deptMapper; // DI(객체 받아오기)

//    TODO: 전체조회 + 총건수(Criteria 의 totalItems 변수 저장)
    public List<?> selectDeptList(Criteria searchVO) {
        List<?> page = deptMapper.selectDeptList(searchVO);

//        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = deptMapper.selectDeptListTotCnt(searchVO);
        searchVO.setTotalItems(count);

        return page;
    }

//    TODO: 부서생성
//     좋은코딩 : 남이 봤는데 가장 간단한 코딩
    public void insert(Dept dept) {
        deptMapper.insert(dept);
    }

//    TODO: 부서 상세조회
    public Optional<Dept> selectDept(int dno) {
        return deptMapper.selectDept(dno);
    }

//    TODO: 부서 수정
//    TODO: 클린코드 서적 : 함수 작성시 몇줄이 좋을까 ? 3~5줄
    public void update(Dept dept) {
        deptMapper.update(dept);
    }

//    TODO: 부서 삭제 (기본키:dno)
    public void delete(int dno) {
        deptMapper.delete(dno);
    }
}
