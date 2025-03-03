import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const BoardUpdate = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    boardTitle: "",
    boardContent: "",
    rating: "",
    boardData: null, 
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/board/get/${boardId}`)
      .then((response) => {
        const data = response.data;
        setBoard({
          boardTitle: data.boardTitle,
          boardContent: data.boardContent,
          rating: data.rating,
          boardData: data.boardData,
        });
        if (data.boardData) {
          setImagePreview(`data:image/jpeg;base64,${data.boardData}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching board data:", error);
      });
  }, [boardId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setBoard({ ...board, boardData: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("boardTitle", board.boardTitle);
    formData.append("boardContent", board.boardContent);
    formData.append("rating", board.rating);
    formData.append("image", board.boardData);

    axios
      .put(`http://localhost:8000/api/board/update/${boardId}`, formData)
      .then((response) => {
        console.log("Board updated successfully");
        navigate("/board");
      })
      .catch((error) => {
        console.error("Error updating board:", error.response ? error.response.data : error.message);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/board/deletion/${boardId}`)
      .then(() => {
        console.log("Board deleted successfully");
        navigate("/board");
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center">Edit Board</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="boardTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="boardTitle"
              value={board.boardTitle}
              onChange={(e) => setBoard({ ...board, boardTitle: e.target.value })}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="boardContent">Content</label>
            <textarea
              className="form-control"
              id="boardContent"
              rows="4"
              value={board.boardContent}
              onChange={(e) => setBoard({ ...board, boardContent: e.target.value })}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              className="form-control"
              id="rating"
              value={board.rating}
              onChange={(e) => setBoard({ ...board, rating: e.target.value })}
              min="1"
              max="5"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="boardImage">Upload Image</label>
            <input
              type="file"
              className="form-control"
              id="boardImage"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "150px", marginTop: "10px" }}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Update Board
          </button>
        </form>

        <button
          className="btn btn-danger mt-3"
          onClick={handleDelete}
          style={{ marginLeft: "10px" }}
        >
          Delete Board
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default BoardUpdate;
