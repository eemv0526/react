package com.simplecoding.simpledms.vo.board;


import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Board {

    private int boardId;
    private String boardTitle;
    private String boardContent;
    private double rating;
    private byte[] boardData;
    private String boardUrl;
    private String boardWriter;

    public Board(int boardId, String boardTitle, String boardContent, double rating, byte[] boardData, String boardWriter) {
        this.boardId = boardId;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.rating = rating;
        this.boardData = boardData;
        this.boardWriter = boardWriter;
    }

    public Board(String boardTitle, String boardContent, double rating, byte[] boardData, String boardWriter) {
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.rating = rating;
        this.boardData = boardData;
        this.boardWriter = boardWriter;
    }
}
