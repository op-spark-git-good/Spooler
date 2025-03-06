import React from 'react'
import axios from 'axios';

import { useState, useEffect } from 'react';

const SearchApi = ({ getAllNotionsDB }) => {
  const [keyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

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

      setResults(response.data.Data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleAttributes = (title, image, color, brand, upc) => {
    // Add the selected title to the selectedItems state
    setSelectedItems((prevItems) => [...prevItems, title, image, color, brand, upc]);


    axios
      .post('/api/notions/', {
        item: {
          title,
          image,
          color,
          brand,
          upc,
        },
      })
      .then(
        getAllNotionsDB
      )
      .catch((error) => {
        console.error('Error adding item:', error);
        alert('Failed to add item!');
      });
  };



  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setSearchKeyword(e.target.value)} // Update state with user input
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
                  Add to Notion Stash
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