package com.simplecoding.simpledms.service.cart;

import com.simplecoding.simpledms.mapper.cart.CartMapper;
import com.simplecoding.simpledms.vo.cart.Cart;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.gongji.Gongji;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartMapper cartMapper;

    public void insert(Cart cart) {
        cartMapper.insert(cart);
    }



    //    전체조회 + 총건수 추가
    public List<Cart> selectCartList(Criteria searchVO) {
        return cartMapper.selectCartListByEmail(searchVO);  // Mapper 호출
    }


    public void delete(String cartId) {
        cartMapper.delete(cartId);
    }






}
