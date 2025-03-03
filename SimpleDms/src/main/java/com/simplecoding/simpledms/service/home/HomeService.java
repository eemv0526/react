package com.simplecoding.simpledms.service.home;


import com.simplecoding.simpledms.mapper.home.HomeMapper;
import com.simplecoding.simpledms.vo.advanced.FileDb;
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
public class HomeService {

    private final HomeMapper homeMapper;

    //    전체조회 + 총건수 추가
    public List<?> selectHomeList(Criteria searchVO) {
        List<?> page = homeMapper.selectHomeList(searchVO);
        //        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = homeMapper.selectHomeListTotCnt(searchVO);
        searchVO.setTotalItems(count);
        return page;
    }

    //    FileDb 생성 : 이미지 업로드(DB/클라우드(현대)/PC)
    public void insert(Home home) {
//        1) uuid 생성
        String uuid = UUID.randomUUID().toString();
//        2) 다운로드 url 생성 :
        String url = generateDownloadUrl(uuid);
//        3) VO 에 uuid/url 저장(setter)
        home.setUuid(uuid);
        home.setHomeUrl(url);
//        4) insert(VO)
        homeMapper.insert(home);
    }


    //  download url 만들기 함수
    public String generateDownloadUrl(String uuid) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()                         // spring 기본주소 : http://localhost:8000
                .path("/api/home/home/")                    // 추가 경로 넣기 : /advanced/fileDb/
                .path(uuid)                                       // uuid 넣기     : xxxxxx
                .toUriString();                                   // 합치기 : http://localhost:8000/advanced/fileDb/xxxxxx
    }






    //    상세조회
    public Optional<Home> selectHome(String uuid) {
        return homeMapper.selectHome(uuid);
    }




    //    FileDB 수정
    public void update(Home home) {
//        1) uuid 가져오기(*)
        String uuid = home.getUuid();
//        2) 다운로드 url 생성 :
        String url = generateDownloadUrl(uuid);
//        3) VO 에 uuid/url 저장(setter)
        home.setUuid(uuid);
        home.setHomeUrl(url);
//        4) update(VO)(*)
        homeMapper.update(home);
    }

    //    삭제
    public void delete(String uuid) {
        homeMapper.delete(uuid);
    }









}
