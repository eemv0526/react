package com.simplecoding.simpledms.mapper.anime;

import com.simplecoding.simpledms.vo.anime.Anime;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.simplecoding.simpledms.vo.common.Criteria;
import java.util.List;
import java.util.Optional;

@Mapper
public interface AnimeMapper {


    List<?> selectAnimeList(@Param("searchVO") Criteria searchVO, @Param("uuid") String uuid);
    int selectAnimeListTotCnt(@Param("searchVO") Criteria searchVO, @Param("uuid") String uuid);
    public int insert(Anime anime);                       // 부서생성
    public Optional<Anime> selectAnime(int animeId);
    public int update(Anime anime);
    public int delete(int animeId);
    Double getAverageRatingByUuid(@Param("uuid") String uuid);

}
