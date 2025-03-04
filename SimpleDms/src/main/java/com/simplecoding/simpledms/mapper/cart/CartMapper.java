package com.simplecoding.simpledms.mapper.cart;

import com.simplecoding.simpledms.vo.cart.Cart;
import com.simplecoding.simpledms.vo.comic.Comic;
import com.simplecoding.simpledms.vo.common.Criteria;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CartMapper {

    public int insert(Cart cart);                     //  생성
    public List<?> selectCartList(Criteria searchVO);   // 전체조회
    public int selectCartListTotCnt(Criteria searchVO); // 총건수구하기
    public int delete(String cardId); // 삭제

    List<Cart> selectCartListByEmail(Criteria searchVO);
}
