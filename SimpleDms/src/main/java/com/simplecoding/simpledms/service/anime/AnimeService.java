package com.simplecoding.simpledms.service.anime;


import com.simplecoding.simpledms.mapper.anime.AnimeMapper;
import com.simplecoding.simpledms.vo.anime.Anime;
import com.simplecoding.simpledms.vo.common.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnimeService {


private final AnimeMapper animeMapper;

    public List<?> selectAnimeList(Criteria searchVO, String uuid) {
        List<?> page = animeMapper.selectAnimeList(searchVO, uuid);


        int count = animeMapper.selectAnimeListTotCnt(searchVO, uuid);
        searchVO.setTotalItems(count);

        return page;
    }

    public void insert(Anime anime) {
        animeMapper.insert(anime);
    }

    //    TODO: 부서 상세조회
    public Optional<Anime> selectAnime(int animeId) {
        return animeMapper.selectAnime(animeId);
    }

    //    TODO: 부서 수정
//
    public void update(Anime anime) {
        animeMapper.update(anime);
    }



    //    TODO: 부서 삭제 (기본키:dno)
    public void delete(int animeId) {
        animeMapper.delete(animeId);
    }



    public Double getAverageRating(String uuid) {
        return animeMapper.getAverageRatingByUuid(uuid);
    }


    public List<Anime> getAnimeByEmail(String email) {
        return animeMapper.findAnimeByEmail(email);
    }




}
