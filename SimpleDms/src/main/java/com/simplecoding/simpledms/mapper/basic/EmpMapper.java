package com.simplecoding.simpledms.mapper.basic;

import com.simplecoding.simpledms.vo.basic.Emp;
import com.simplecoding.simpledms.vo.common.Criteria;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : EmpMapper
 * @since : 24. 10. 24.
 * description : TODO: 연습(총건수 sql문 작성)
 *          - 서비스 : 총건수(criteria 의 totalItems 저장)
 *          - 컨트롤러 추가 : ResultDto 객체(박스포장) 사용
 *          - (결과 테스트)
 *          TODO: 연습(insert)
 *           * - 서비스 : insert
 *  *          - 컨트롤러 추가 : insert
 *  *          - (결과 테스트) : post 방식 테스트
 *           TODO: 연습(상세조회)
 *             - 서비스 : selectEmp
 *  *          - 컨트롤러 추가 : selectEmp
 *  *          - (결과 테스트) : get 방식 테스트
 *                  eno : 8000
 *            TODO: 연습(사원수정)
 *              - 수정 : 기본키(수정불가, 조건으로 사용)
 *             - 서비스 : update
 *  *          - 컨트롤러 추가 : update
 *  *          - (결과 테스트) : put 방식 테스트
 *             TODO: 연습(사원삭제)
 *              - 삭제 : 기본키(조건으로 사용)
 *             - 서비스 : delete
 *  *          - 컨트롤러 추가 : delete
 *  *          - (결과 테스트) : delete 방식 테스트
 */
@Mapper
public interface EmpMapper {
    public List<?> selectEmpList(Criteria searchVO);
    public int selectEmpListTotCnt(Criteria searchVO); // 총건수구하기
    public int insert(Emp emp);                        // 사원생성
    public Optional<Emp> selectEmp(int eno);           // 사원상세조회
    public int update(Emp emp);                        // 사원수정
    public int delete(int eno);                        // 사원삭제
}
