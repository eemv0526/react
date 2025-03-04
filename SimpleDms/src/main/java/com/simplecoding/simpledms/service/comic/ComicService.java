package com.simplecoding.simpledms.service.comic;


import com.simplecoding.simpledms.mapper.comic.ComicMapper;
import com.simplecoding.simpledms.vo.comic.Comic;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.home.Home;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ComicService {

    private final ComicMapper comicMapper;


    //    전체조회 + 총건수 추가
    public List<?> selectComicList(Criteria searchVO) {
        List<?> page = comicMapper.selectComicList(searchVO);
        //        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = comicMapper.selectComicListTotCnt(searchVO);
        searchVO.setTotalItems(count);
        return page;
    }


    public void insert(Comic comic) {
//        1) uuid 생성
        String uuid = UUID.randomUUID().toString();
//        2) 다운로드 url 생성 :
        String url = generateDownloadUrl(uuid);
//        3) VO 에 uuid/url 저장(setter)
        comic.setUuid(uuid);
        comic.setBookUrl(url);
//        4) insert(VO)
        comicMapper.insert(comic);
    }


    //  download url 만들기 함수
    public String generateDownloadUrl(String uuid) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()                         // spring 기본주소 : http://localhost:8000
                .path("/api/comic/comic/")                    // 추가 경로 넣기 : /advanced/fileDb/
                .path(uuid)                                       // uuid 넣기     : xxxxxx
                .toUriString();                                   // 합치기 : http://localhost:8000/advanced/fileDb/xxxxxx
    }






    //    상세조회
    public Optional<Comic> selectComic(String uuid) {
        return comicMapper.selectComic(uuid);
    }




    //    FileDB 수정
    public void update(Comic comic) {
//        1) uuid 가져오기(*)
        String uuid = comic.getUuid();
//        2) 다운로드 url 생성 :
        String url = generateDownloadUrl(uuid);
//        3) VO 에 uuid/url 저장(setter)
        comic.setUuid(uuid);
        comic.setBookUrl(url);
//        4) update(VO)(*)
        comicMapper.update(comic);
    }

    //    삭제
    public void delete(String uuid) {
        comicMapper.delete(uuid);
    }








}
