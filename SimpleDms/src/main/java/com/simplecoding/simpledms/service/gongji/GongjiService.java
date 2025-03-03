package com.simplecoding.simpledms.service.gongji;

import com.simplecoding.simpledms.mapper.gongji.GongjiMapper;
import com.simplecoding.simpledms.vo.basic.Dept;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.gongji.Gongji;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GongjiService {


    private final GongjiMapper gongjiMapper;


    //    TODO: 전체조회 + 총건수(Criteria 의 totalItems 변수 저장)
    public List<?> selectGongjiList(Criteria searchVO) {
        List<?> page = gongjiMapper.selectGongjiList(searchVO);

//        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = gongjiMapper.selectGongjiListTotCnt(searchVO);
        searchVO.setTotalItems(count);

        return page;
    }

    //    TODO: 부서생성
//     좋은코딩 : 남이 봤는데 가장 간단한 코딩
    public void insert(Gongji gongji) {
        gongjiMapper.insert(gongji);
    }

    //    TODO: 부서 상세조회
    public Optional<Gongji> selectGongji(int gno) {
        return gongjiMapper.selectGongji(gno);
    }

    //    TODO: 부서 수정
//    TODO: 클린코드 서적 : 함수 작성시 몇줄이 좋을까 ? 3~5줄
    public void update(Gongji gongji) {
        gongjiMapper.update(gongji);
    }

    //    TODO: 부서 삭제 (기본키:dno)
    public void delete(int gno) {
        gongjiMapper.delete(gno);
    }




}
