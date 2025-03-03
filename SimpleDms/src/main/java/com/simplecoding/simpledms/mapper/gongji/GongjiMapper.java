package com.simplecoding.simpledms.mapper.gongji;

import com.simplecoding.simpledms.vo.basic.Dept;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.gongji.Gongji;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface GongjiMapper {

    public List<?> selectGongjiList(Criteria searchVO);   // 전체조회
    public int selectGongjiListTotCnt(Criteria searchVO); // 총건수구하기
    public int insert(Gongji gongji);                       // 부서생성
    public Optional<Gongji> selectGongji(int gno);          // 상세조회
    public int update(Gongji gongji);                       // 부서수정
    public int delete(int gno);                         // 부서삭제




}
