import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GongjiUpdate = () => {
  const { gno } = useParams(); // Get gno from the URL
  const [gongji, setGongji] = useState({ title: '', content: '' }); // 상태 변수
  const navigate = useNavigate();

  // Fetch Gongji details (상세조회)
  useEffect(() => {
    const fetchGongji = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/gongji/gongji/${gno}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        
        // 초기 상태 설정 (상세조회로 받은 데이터)
        setGongji({
          title: data.title,
          content: data.content,
        });
      } catch (error) {
        console.error("Error fetching Gongji data:", error);
      }
    };
    fetchGongji();
  }, [gno]); // gno가 변경될 때마다 호출

  // Handle delete action
  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this notice?');
    if (confirmation) {
      try {
        const gnoNumber = parseInt(gno, 10);
        if (isNaN(gnoNumber)) {
          alert("Invalid gno parameter!");
          return;
        }

        const response = await fetch(`http://localhost:8000/api/gongji/gongji/deletion/${gnoNumber}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Notice deleted successfully!');
          navigate('/gongji'); // Redirect to Gongji page after deletion
        } else {
          alert('Error occurred while deleting.');
        }
      } catch (error) {
        console.error('Error during deletion:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Notice Details</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={gongji.title} // 수정할 데이터 상태
          disabled // 수정 불가
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          className="form-control"
          id="content"
          value={gongji.content} // 수정할 데이터 상태
          rows="5"
          disabled // 수정 불가
        ></textarea>
      </div>
      <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default GongjiUpdate;
