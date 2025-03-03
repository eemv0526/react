package com.simplecoding.simpledms.mapper.sign;


import com.simplecoding.simpledms.vo.auth.Member;
import com.simplecoding.simpledms.vo.sign.Sign;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface SignMapper {

    // 회원가입
    public int insert(Sign sign);

    // 우리 회원인지 확인
    public long existsById(String email);

    // 회원 상세조회
    public Optional<Sign> selectSign(String email);



}
