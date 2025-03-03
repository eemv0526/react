import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/Board.css";
const Board = () => {
  const [boardData, setBoardData] = useState([]);

  const userEmail = localStorage.getItem("email");
  const userRole = localStorage.getItem("codeName");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/board")
      .then((response) => {
        if (response.data.results && Array.isArray(response.data.results)) {
          setBoardData(response.data.results);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching board data:", error);
      });
  }, []);

  const renderRatingStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="text-warning">
        ★
      </span>
    ));
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-primary">애니메이션 추천 & 자유 게시판</h2>

        {Array.isArray(boardData) && boardData.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                 
                  <th>Writer</th>
                  <th>Rating</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {boardData.map((board, index) => (
                  <tr
                    key={board.boardId}
                    className={`table-${["light", "info", "warning", "danger"][index % 4]}`} // 행마다 색상 변경
                  >
                    <td>{board.boardId}</td>
                    <td>
                      <Link
                        to={`/boarddetail/${board.boardId}`}
                        className="text-decoration-none text-dark fw-bold"
                      >
                        {board.boardTitle}
                      </Link>
                    </td>
                   
                    <td>{board.boardWriter}</td>
                    <td>{renderRatingStars(board.rating)}</td>
                    <td>
                      {board.boardData ? (
                        <img
                          src={`data:image/jpeg;base64,${board.boardData}`}
                          alt="Board"
                          className="img-fluid rounded"
                          style={{ maxWidth: "100px", height: "auto" }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>
                      {(board.boardWriter === userEmail || userRole === "ROLE_ADMIN") && (
                        <Link
                          to={`/boardupdate/${board.boardId}`}
                          className="btn btn-sm btn-warning"
                        >
                          수정 및 삭제
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-muted">No data available</p>
        )}

        <div className="d-flex justify-content-end mt-4">
          <Link
            to="/boardadd"
            className="btn btn-primary btn-lg shadow-sm rounded-pill"
          >
            Add New
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Board;
