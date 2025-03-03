package com.simplecoding.simpledms.service.board;


import com.simplecoding.simpledms.mapper.board.BoardMapper;
import com.simplecoding.simpledms.vo.board.Board;
import com.simplecoding.simpledms.vo.common.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

private final BoardMapper boardMapper;

    //    전체조회 + 총건수 추가
    public List<?> selectBoardList(Criteria searchVO) {
        List<?> page = boardMapper.selectBoardList(searchVO);
        //        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = boardMapper.selectBoardListTotCnt(searchVO);
        searchVO.setTotalItems(count);
        return page;
    }


    public void insert(Board board) {
        boardMapper.insert(board);
//      생성된 tourId를 DB에서 가져오기(SQL문 CURRVAL)
        int boardId = boardMapper.selectGenerateBoardId();
//      생성된 tourId를 tour객체에 저장\
        board.setBoardId(boardId);
//      URL생성
        String url = generateBoardUrl(board.getBoardId());
        board.setBoardUrl(url);
//      URL 업데이트
        boardMapper.updateboardIdUrl(board);
    }


    //  generateTourUrl 매서드 정의
    public String generateBoardUrl(int boardId) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()        // spring 기본주소 : http://localhost:8000
                .path("/api/board/")              // 추가 경로 넣기 : /api/tour/
                .path(String.valueOf(boardId))
                .toUriString();                  // 합치기 : http://localhost:8000/api/tour/xxxxxx
    }



    //  상세조회
    public Optional<Board> select(int boardId){
        return boardMapper.select(boardId);
    }



    //  수정
    public void update(Board board){
        int boardId = board.getBoardId();
        String url = generateBoardUrl(boardId);
        board.setBoardId(boardId);
        board.setBoardUrl(url);
        boardMapper.update(board);
    }

    //  삭제
    public void delete(int boardId){
        boardMapper.delete(boardId);
    }














}
