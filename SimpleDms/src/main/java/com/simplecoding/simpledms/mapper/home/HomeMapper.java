package com.simplecoding.simpledms.mapper.home;

import com.simplecoding.simpledms.vo.advanced.FileDb;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.home.Home;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface HomeMapper {


    public List<?> selectHomeList(Criteria searchVO);   // 전체조회
    public int selectHomeListTotCnt(Criteria searchVO); // 총건수구하기
    public int insert(Home home);                     //  생성
    public Optional<Home> selectHome(String uuid);    // FileDb 상세조회
    public int update(Home home);                     // 수정함수\
    public int delete(String uuid); // 삭제
}
