package com.simplecoding.simpledms.service.advanced;

import com.simplecoding.simpledms.mapper.advanced.GalleryMapper;
import com.simplecoding.simpledms.vo.advanced.Gallery;
import com.simplecoding.simpledms.vo.common.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author : KTE
 * @fileName : GalleryService
 * @since : 24. 11. 4.
 * description :
 */
@Service
@RequiredArgsConstructor
public class GalleryService {
    private final GalleryMapper galleryMapper;

    //    전체조회 + 총건수
    public List<?> selectGalleryList(Criteria searchVO) {
        List<?> page = galleryMapper.selectGalleryList(searchVO);
        //        TODO: 총건수 저장 : Criteria 의 totalItems
        int count = galleryMapper.selectGalleryListTotCnt(searchVO);
        searchVO.setTotalItems(count);
        return page;
    }

    //    상세조회
    public Optional<Gallery> selectGallery(String uuid) {
        return galleryMapper.selectGallery(uuid);
    }

    //   생성 : 이미지 업로드(DB/클라우드(현대)/PC)
    public void insert(Gallery gallery) {
        String uuid = UUID.randomUUID().toString();
        String url = generateDownloadUrl(uuid);
        gallery.setUuid(uuid);
        gallery.setGalleryFileUrl(url);
        galleryMapper.insert(gallery);
    }

    //  download url 만들기 함수
    public String generateDownloadUrl(String uuid) {
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()                         // spring 기본주소 : http://localhost:8000
                .path("/api/advanced/gallery/")                    // 추가 경로 넣기 : /advanced/fileDb/
                .path(uuid)                                       // uuid 넣기     : xxxxxx
                .toUriString();                                   // 합치기 : http://localhost:8000/advanced/fileDb/xxxxxx
    }

    //    수정
    public void update(Gallery gallery) {
        String uuid = gallery.getUuid();
        String url = generateDownloadUrl(uuid);
        gallery.setUuid(uuid);
        gallery.setGalleryFileUrl(url);
        galleryMapper.update(gallery);
    }

    //    삭제
    public void delete(String uuid) {
        galleryMapper.delete(uuid);
    }
}
