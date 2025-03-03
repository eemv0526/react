package com.simplecoding.simpledms.mapper.advanced;

import com.simplecoding.simpledms.vo.advanced.FileDb;
import com.simplecoding.simpledms.vo.common.Criteria;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : FileDbMapper
 * @since : 24. 11. 1.
 * description :
 *
 */
@Mapper
public interface FileDbMapper {
    public List<?> selectFileDbList(Criteria searchVO);   // 전체조회
    public int selectFileDbListTotCnt(Criteria searchVO); // 총건수구하기
    public int insert(FileDb fileDb);                     // FileDb 생성
    public Optional<FileDb> selectFileDb(String uuid);    // FileDb 상세조회
    public int update(FileDb fileDb);                     // 수정함수
    public int delete(String uuid); // 삭제
}
