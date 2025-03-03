package com.simplecoding.simpledms.mapper.basic;

import com.simplecoding.simpledms.vo.basic.Dept;
import com.simplecoding.simpledms.vo.common.Criteria;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : DeptMapper
 * @since : 24. 10. 23.
 * description : 부서 매퍼
 */
@Mapper
public interface DeptMapper {
    public List<?> selectDeptList(Criteria searchVO);   // 전체조회
    public int selectDeptListTotCnt(Criteria searchVO); // 총건수구하기
    public int insert(Dept dept);                       // 부서생성
    public Optional<Dept> selectDept(int dno);          // 상세조회
    public int update(Dept dept);                       // 부서수정
    public int delete(int dno);                         // 부서삭제
}
