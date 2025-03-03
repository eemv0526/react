import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // Image state
  const [newTitle, setNewTitle] = useState(''); // Modified title
  const [newText, setNewText] = useState(''); // Modified text
  const [newSummary, setNewSummary] = useState(''); // Modified summary (줄거리)
  const [selectedGenres, setSelectedGenres] = useState([]); // State for selected genres
  const [isGenreListVisible, setIsGenreListVisible] = useState(false); // Genre list toggle state
  const queryParams = new URLSearchParams(location.search);
  const uuid = queryParams.get('uuid');

  // Genre list
  const genres = ['액션', '전쟁', '멜로', '일상', '학원', 'SF', '메카', '공포', '미스테리', '모험', '판타지', '스포츠'];

  // Detailed view API call
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/home/home/get/${uuid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        setDetails(data);
        setNewTitle(data.homeTitle); // Initial title
        setNewText(data.homeText); // Initial text
        setNewSummary(data.homeSummary); // Initialize summary (줄거리)
        setSelectedGenres(data.homeGenre || []); // Initialize selected genres
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setDetails(null);
        setIsLoading(false);
      }
    };

    if (uuid) {
      fetchDetails();
    }
  }, [uuid]);

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prevGenres) => {
      if (!Array.isArray(prevGenres)) {
        prevGenres = [];
      }

      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageFile = e.target.image.files[0];
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile); // Add new image file
    }
    formData.append('homeTitle', newTitle); // Add new title
    formData.append('homeText', newText); // Add new text
    formData.append('homeSummary', newSummary); // Add new summary (줄거리)
    formData.append('homeGenre', selectedGenres.join(',')); // Add selected genres
    formData.append('uuid', uuid); // Add UUID

    try {
      const response = await fetch(`http://localhost:8000/api/home/home/update/${uuid}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Data successfully updated.');
        navigate('/'); // Navigate to the main page after update
      } else {
        console.error('Server error:', response.statusText);
        alert('An error occurred on the server.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('A network error occurred.');
    }
  };

  // Delete handler
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/home/home/deletion/${uuid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Data successfully deleted.');
        navigate('/'); // Navigate to the main page after deletion
      } else {
        console.error('Server error:', response.statusText);
        alert('An error occurred on the server.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('A network error occurred.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!details) {
    return <div>No details available.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Image preview */}
        <div>
          <img
            src={`data:image/jpeg;base64,${details.homeData}`}
            alt={details.homeTitle}
            style={{ width: '30%', marginBottom: '10px' }}
          />
        </div>

        {/* Image upload field */}
        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: '100px', marginTop: '10px' }}
            />
          )}
        </div>

        {/* Title edit field */}
        <div>
        <label>제목 수정</label>
          <textarea
            name="homeTitle"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px', height: '80px' }}
          />
        </div>

        {/* Text edit field */}
        <div>
        <label>등급 수정</label>
          <textarea
            name="homeText"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
        </div>

        {/* Summary edit field */}
        <div>
        <label>줄거리 수정</label>
          <textarea
            name="homeSummary"
            value={newSummary}
            onChange={(e) => setNewSummary(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '10px', height: '100px' }}
          />
        </div>

        {/* Genre selection toggle */}
        <div>
        <label>장르 수정</label>
          <button
            type="button"
            onClick={() => setIsGenreListVisible(!isGenreListVisible)}
            style={{ marginTop: '10px', padding: '10px 20px' }}
          >
            Genre Selection
          </button>

          {isGenreListVisible && (
            <div style={{ marginTop: '10px' }}>
              {genres.map((genre) => (
                <div key={genre}>
                  <input
                    type="checkbox"
                    id={genre}
                    value={genre}
                    onChange={handleGenreChange}
                    checked={selectedGenres.includes(genre)}
                  />
                  <label htmlFor={genre} style={{ marginLeft: '5px' }}>
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit button */}
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
          Update
        </button>

        {/* Delete button */}
        <button
          type="button"
          onClick={handleDelete}
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'red', color: 'white' }}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default HomeUpdate;
