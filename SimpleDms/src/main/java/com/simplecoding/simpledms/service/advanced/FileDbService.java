package com.simplecoding.simpledms.service.advanced;

import com.simplecoding.simpledms.mapper.advanced.FileDbMapper;
import com.simplecoding.simpledms.vo.advanced.FileDb;
import com.simplecoding.simpledms.vo.common.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author : KTE
 * @fileName : FileDbService
 * @since : 24. 11. 1.
 * description :
 */
@Service
@RequiredArgsConstructor
public class FileDbService {
    private final FileDbMapper fileDbMapper;

    //    전체조회 + 총건수 추가
    public List<?> selectFileDbList(Criteria searchVO) {
        List<?> page = fileDbMapper.selectFileDbList(searchVO);
        //        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = fileDbMapper.selectFileDbListTotCnt(searchVO);
        searchVO.setTotalItems(count);
        return page;
    }

    //    FileDb 생성 : 이미지 업로드(DB/클라우드(현대)/PC)
    public void insert(FileDb fileDb) {
//        1) uuid 생성
        String uuid = UUID.randomUUID().toString();
//        2) 다운로드 url 생성 :
        String url = generateDownloadUrl(uuid);
//        3) VO 에 uuid/url 저장(setter)
        fileDb.setUuid(uuid);
        fileDb.setFileUrl(url);
//        4) insert(VO)
        fileDbMapper.insert(fileDb);
    }

    //  download url 만들기 함수
    public String generateDownloadUrl(String uuid) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()                         // spring 기본주소 : http://localhost:8000
                .path("/api/advanced/fileDb/")                    // 추가 경로 넣기 : /advanced/fileDb/
                .path(uuid)                                       // uuid 넣기     : xxxxxx
                .toUriString();                                   // 합치기 : http://localhost:8000/advanced/fileDb/xxxxxx
    }

    //    상세조회
    public Optional<FileDb> selectFileDb(String uuid) {
        return fileDbMapper.selectFileDb(uuid);
    }

    //    FileDB 수정
    public void update(FileDb fileDb) {
//        1) uuid 가져오기(*)
        String uuid = fileDb.getUuid();
//        2) 다운로드 url 생성 :
        String url = generateDownloadUrl(uuid);
//        3) VO 에 uuid/url 저장(setter)
        fileDb.setUuid(uuid);
        fileDb.setFileUrl(url);
//        4) update(VO)(*)
        fileDbMapper.update(fileDb);
    }

//    삭제
    public void delete(String uuid) {
        fileDbMapper.delete(uuid);
    }
}
