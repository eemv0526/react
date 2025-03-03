package com.simplecoding.simpledms.mapper.auth;

import com.simplecoding.simpledms.vo.auth.Member;
import org.apache.ibatis.annotations.Mapper;

import javax.swing.plaf.PanelUI;
import java.util.Optional;

/**
 * @author : KTE
 * @fileName : MemberMapper
 * @since : 24. 11. 11.
 * description :
 */
@Mapper
public interface MemberMapper {

    // 회원가입
    public int insert(Member member);

    // 우리 회원인지 확인
    public long existsById(String email);

    // 회원 상세조회
    public Optional<Member> selectMember(String email);

}
