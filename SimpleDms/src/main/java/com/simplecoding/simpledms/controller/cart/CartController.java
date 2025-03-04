package com.simplecoding.simpledms.controller.cart;


import com.simplecoding.simpledms.service.cart.CartService;
import com.simplecoding.simpledms.vo.cart.Cart;
import com.simplecoding.simpledms.vo.common.Criteria;
import com.simplecoding.simpledms.vo.dto.ResultDto;
import com.simplecoding.simpledms.vo.sign.Sign;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;



    @PostMapping("/api/cart/cart")
    public ResponseEntity<?> insert(@RequestBody Cart cart) {

        cartService.insert(cart);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/api/cart/all")
    public ResponseEntity<?> selectCartList(@RequestParam String email, Criteria searchVO) {
        // Criteria에 email을 추가하여 이메일에 맞는 장바구니 데이터만 조회
        searchVO.setEmail(email); // email을 Criteria에 넣어줍니다.
        List<?> carts = cartService.selectCartList(searchVO); // service 호출
        ResultDto resultDto = new ResultDto(carts, searchVO.getTotalItems()); // 결과 반환
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }





    //    삭제, 기본키(uuid)
    @DeleteMapping("/api/cart/cart/deletion/{cartId}")
    public ResponseEntity<?> delete(
            @PathVariable String cartId
    ) {
        cartService.delete(cartId);
//        코딩 : tab 키
        return new ResponseEntity<>(HttpStatus.OK);
    }














}
