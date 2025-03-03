package com.simplecoding.simpledms.controller.anime;

import com.simplecoding.simpledms.service.anime.AnimeSerivce;
import com.simplecoding.simpledms.vo.anime.Anime;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AnimeController {

private final AnimeSerivce animeService;




    //    전체 조회


    @GetMapping("/api/anime")
    public ResponseEntity<?> selectAnimeList(Criteria searchVO, @RequestParam String uuid) {
        List<?> anime = animeService.selectAnimeList(searchVO, uuid);
        ResultDto resultDto = new ResultDto(anime, searchVO.getTotalItems());
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }


    //    부서 생성

    @PostMapping("/api/anime/{uuid}/add")
    public ResponseEntity<?> insert(
            @RequestBody Anime anime, Authentication authentication
    ) {
        String email = authentication.getName();
        anime.setEmail(email);

        animeService.insert(anime);

        return new ResponseEntity<>(HttpStatus.OK);
    }







    //상세

    @GetMapping("/api/anime/get/{animeId}")
    public ResponseEntity<?> selectAnime(
            @PathVariable int animeId
    ) {
        Optional<Anime> anime = animeService.selectAnime(animeId);

        if (anime.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(anime.get(), HttpStatus.OK);
    }


    //수정
    @PutMapping("/api/anime/update/{animeId}")
    public ResponseEntity<?> update(
            @PathVariable int animeId,
            @RequestBody Anime anime
    ) {
        animeService.update(anime);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //    삭제
    @DeleteMapping("/api/anime/deletion/{animeId}")
    public ResponseEntity<?> delete(@PathVariable int animeId) {
        animeService.delete(animeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @GetMapping("/api/anime/rating")
    public ResponseEntity<Map<String, Object>> getAverageRating(@RequestParam String uuid) {
        try {
            Double avgRating = animeService.getAverageRating(uuid);

            Map<String, Object> response = new HashMap<>();
            response.put("uuid", uuid);
            response.put("averageRating", avgRating);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // 예외 처리
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "서버에서 오류가 발생했습니다.");
            errorResponse.put("message", e.getMessage()); // 에러 메시지 반환
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
