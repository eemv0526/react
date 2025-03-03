package com.simplecoding.simpledms.mapper.advanced;

import com.simplecoding.simpledms.vo.advanced.Gallery;
import com.simplecoding.simpledms.vo.common.Criteria;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : GalleryMapper
 * @since : 24. 11. 1.
 * description :
 *  TODO: 연습 2) 총건수 기능을 구현하세요
 *     참고) FileDbMapper , FileDb.xml, FileDbService, FileDbController
 *       총건수 : selectGalleryListTotCnt
 *       연습 3) insert 기능 완성
 *     참고) FileDbMapper , FileDb.xml, FileDbService, FileDbController
 *     연습 4) 상세조회 기능 완성
 *     참고) FileDbMapper , FileDb.xml, FileDbService, FileDbController
 *     연습 5) 수정 기능 완성
 *     참고) FileDbMapper , FileDb.xml, FileDbService, FileDbController
 *     연습 6) 삭제 기능 완성
 *     참고) FileDbMapper , FileDb.xml, FileDbService, FileDbController
 */
@Mapper
public interface GalleryMapper {
    public List<?> selectGalleryList(Criteria searchVO);
    public int selectGalleryListTotCnt(Criteria searchVO);
    public int insert(Gallery gallery);
    public Optional<Gallery> selectGallery(String uuid);
    public int update(Gallery gallery);
    public int delete(String uuid);
}
