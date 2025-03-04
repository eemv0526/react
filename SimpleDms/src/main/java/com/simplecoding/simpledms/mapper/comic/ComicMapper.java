package com.simplecoding.simpledms.mapper.comic;


import com.simplecoding.simpledms.vo.comic.Comic;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.home.Home;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ComicMapper {

    public List<?> selectComicList(Criteria searchVO);   // 전체조회
    public int selectComicListTotCnt(Criteria searchVO); // 총건수구하기
    public int insert(Comic comic);                     //  생성
    public Optional<Comic> selectComic(String uuid);    // 상세조회
    public int update(Comic comic);                     // 수정함수\
    public int delete(String uuid); // 삭제


}
