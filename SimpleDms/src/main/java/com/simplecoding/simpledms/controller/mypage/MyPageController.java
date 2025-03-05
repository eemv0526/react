package com.simplecoding.simpledms.controller.mypage;


import com.simplecoding.simpledms.service.anime.AnimeService;
import com.simplecoding.simpledms.service.board.BoardService;
import com.simplecoding.simpledms.vo.anime.Anime;
import com.simplecoding.simpledms.vo.board.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final BoardService boardService;

    // 로그인한 사용자가 작성한 게시글을 조회하는 API
    @GetMapping("/api/mypage/boards")
    public ResponseEntity<List<Board>> getUserBoards(@RequestParam String email) {
        List<Board> userBoards = boardService.getBoardsByEmail(email);

        // 게시글 목록을 반환
        return new ResponseEntity<>(userBoards, HttpStatus.OK);
    }


    private final AnimeService animeService;

    // 이메일을 기준으로 Anime 데이터를 조회하는 API
    @GetMapping("/api/mypage/animes")
    public ResponseEntity<List<Anime>> getUserAnimes(@RequestParam String email) {
        List<Anime> userAnimes = animeService.getAnimeByEmail(email);

        // 응답으로 애니메이션 목록 반환
        return new ResponseEntity<>(userAnimes, HttpStatus.OK);
    }



}
