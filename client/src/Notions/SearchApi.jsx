import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchApi = ({ getAllNotionsDB }) => {
  const [keyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [info, setInfo] = useState([]);  // State to store info for the post request
  const navigate = useNavigate(); // Use the `useNavigate` hook for navigation

  const handleSearch = async () => {
    if (!keyword) return; // Don't make request if there's no search query

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/notions/search', {
        params: {
          query: keyword,
        },
      });

      setResults(response.data.Data);  // Store the search results
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleAttributes = async (title, image, color, brand, upc) => {
    // Add the selected item to the selectedItems state
    const selectedItem = { title, image, color, brand, upc };

    setSelectedItems((prevItems) => [...prevItems, selectedItem]);  // Update selected items state

    try {
      console.log('Sending POST request with selected item:', selectedItem); // Log the item you're sending
      const response = await axios.post('/api/notions/', {
        item: selectedItem,
      });

      // Log the response data after the POST request
      console.log('Response from POST request:', response.data);

      // Wait until the POST request is completed, then update the info state
      setInfo(response.data)



      // Once info is updated, navigate to the form page and pass the updated info
      navigate('/notion-form', {
        state: {
          title,
          image,
          color,
          brand,
          upc,
          info: response.data,
        },
      });

    } catch (error) {
      console.error('Error adding Notion:', error);
      alert('Failed to add Notion!');
    }
  };




  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setSearchKeyword(e.target.value)}  // Update state with user input
        placeholder="Enter search term"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p>{error}</p>}

      {/* Search Results */}
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((notion) => (
              <li key={notion.item_attributes.upc}>
                <h3>{notion.item_attributes.title}</h3>
                <p>Brand: {notion.item_attributes.brand}</p>
                <p>Color: {notion.item_attributes.color}</p>
                <img
                  src={notion.item_attributes.image}
                  alt={notion.item_attributes.title}
                  style={{ width: '100px', height: 'auto' }}
                />
                <button
                  onClick={() =>
                    handleAttributes(
                      notion.item_attributes.title,
                      notion.item_attributes.image,
                      notion.item_attributes.color,
                      notion.item_attributes.brand,
                      notion.item_attributes.upc
                    )
                  }
                >
                  Edit information
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchApi;
