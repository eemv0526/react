package com.simplecoding.simpledms.vo.common;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


/**
 * @author : GGG
 * @fileName : Criteria
 * @since : 2024-04-02 description : 공통 클래스 페이징처리 = 전자결재 프레임워크에서 가져옴
 */
@Getter
@Setter
public class Criteria implements Serializable {
	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/** 검색조건 */
	private String searchCondition = "";

	/** 검색Keyword */
	private String searchKeyword = "";

	/** 검색사용여부 */
	private String searchUseYn = "";

	/** 현재페이지 */
	private int pageIndex = 0;

	/** 페이지갯수 */
	private int pageUnit = 10;

	/** 페이지사이즈 */
	private int pageSize = 10;

	/** firstIndex */
	private int firstIndex = 1;

	/** lastIndex */
	private int lastIndex = 1;

	/** recordCountPerPage */
	private int recordCountPerPage = 100; // 화면에 보일 갯수
	private int totalItems = 0; // 총 건수

	private String insertTime;

	private String updateTime;

	private String email;





}
