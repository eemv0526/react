package com.simplecoding.simpledms.mapper.board;


import com.simplecoding.simpledms.vo.board.Board;
import com.simplecoding.simpledms.vo.common.Criteria;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface BoardMapper {

    public List<?> selectBoardList(Criteria searchVO);    // 전체조회
    public int selectBoardListTotCnt(Criteria searchVO); // 총건수





    //////////////////////////////////////////////////////////



    public int insert(Board board); // 생성

    ////////////////////////////////////////

    public int selectGenerateBoardId();  // boardId 생성 후 가져오는 매서드
    public int updateboardIdUrl(Board board);  // URL 업데이트 추가(boardId + boardUrl)

    public Optional<Board> select(int boardId);  //상세조회

    public int update(Board board);  //수정
    public int delete(int boardId);  //삭제


}
