package com.simplecoding.simpledms.controller.board;


import com.simplecoding.simpledms.service.board.BoardService;
import com.simplecoding.simpledms.vo.board.Board;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class BoardController {

private final BoardService boardService;


    //    전체 조회

    @GetMapping("/api/board")
    public ResponseEntity<?> selectBoardList(Criteria searchVO) {
        List<?> boards = boardService.selectBoardList(searchVO);
        ResultDto resultDto
                = new ResultDto(boards, searchVO.getTotalItems());
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }


    //인서트

    @PostMapping("/api/board/add")
    public ResponseEntity<?> insert(@RequestParam(defaultValue = "")String boardTitle,
                                    @RequestParam(defaultValue = "")String boardContent,
                                    @RequestParam(defaultValue = "")double rating,
                                    @RequestParam(defaultValue = "")String boardWriter,
                                    @RequestParam(required = false) MultipartFile image) throws Exception {

        if (image != null) {
            // 이미지가 있을 경우 처리
        } else {
            // 이미지가 없을 경우 처리
        }


        Board board = new Board(boardTitle, boardContent, rating, image.getBytes(), boardWriter);
        boardService.insert(board);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    //  이미지 다운로드 함수
    @GetMapping("/api/board/{boardId}")
    public ResponseEntity<byte[]> findDownload(@PathVariable int boardId) throws Exception {
//      상세조회 : 객체받기(첨부파일)
        Board board = boardService.select(boardId).orElseThrow(() -> new FileNotFoundException("데이터 없음"));
//      첨부파일 생성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", String.valueOf(board.getBoardId()));  //int형 변환
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//      첨부파일 headers에 담아서 전송
        return new ResponseEntity<byte[]>(board.getBoardData(), headers, HttpStatus.OK);
    }



    //  상세조회
    @GetMapping("/api/board/get/{boardId}")
    public ResponseEntity<?> select(@PathVariable int boardId) {
        Optional<Board> board = boardService.select(boardId);
//      에러처리
        if (board.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(board.get(), HttpStatus.OK);
    }


    //    삭제
    @DeleteMapping("/api/board/deletion/{boardId}")
    public ResponseEntity<?> delete(@PathVariable int boardId) {
        boardService.delete(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    //수정
    @PutMapping("/api/board/update/{boardId}")
    public ResponseEntity<?> update(@PathVariable int boardId,
                                    @RequestParam(defaultValue = "")String boardTitle,
                                    @RequestParam(defaultValue = "")String boardContent,
                                    @RequestParam(defaultValue = "")double rating,
                                    @RequestParam(defaultValue = "")String boardWriter,
                                    @RequestParam MultipartFile image) throws Exception {


        Board board = new Board(boardId, boardTitle, boardContent, rating, image.getBytes(), boardWriter);
        boardService.update(board);
        return new ResponseEntity<>(HttpStatus.OK);
    }









}
