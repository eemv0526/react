import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // URL 파라미터를 받기 위해 사용
import Header from '../components/Header';
import Footer from '../components/Footer';

const BoardDetail = () => {
  const { boardId } = useParams(); // URL 파라미터로 boardId를 받음
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // API 호출하여 해당 boardId의 게시글을 가져옴
    axios
      .get(`http://localhost:8000/api/board/get/${boardId}`)
      .then((response) => {
        console.log("Board Detail:", response.data);
        setBoard(response.data); // 받은 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching board detail:", error);
      });
  }, [boardId]); // boardId가 변경될 때마다 데이터 재조회

  if (!board) return <div>Loading...</div>;

  return (
    <div>
    <Header/>


    <div className="container mt-5">
      <h2 className="text-center">Board Detail</h2>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{board.boardTitle}</h3>
          <p className="card-text">{board.boardContent}</p>
          <div>
            <strong>Rating: </strong> {board.rating} ★
          </div>
          {board.boardData ? (
            <img
              src={`data:image/jpeg;base64,${board.boardData}`}
              alt="Board"
              style={{ width: "300px", height: "auto" }}
            />
          ) : (
            <p>No Image</p>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BoardDetail;
