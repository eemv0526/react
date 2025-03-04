package com.simplecoding.simpledms.vo.cart;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Cart {


    private Long cartId;          // CART_ID (기본키)
    private String email;         // EMAIL
    private String bookTitle;     // BOOK_TITLE
    private Double bookPrice;     // BOOK_PRICE
    private Integer quantity;     // QUANTITY
    private Double totalPrice;    // TOTAL_PRICE
    private String bookUrl;       // BOOK_URL









}
