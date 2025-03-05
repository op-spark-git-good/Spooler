import React from 'react'
import axios from 'axios'
import { useState } from 'react'
const SearchApi = () => {
  const [keyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!keyword) return; // Don't make request if there's no search query

    setLoading(true);
    setError(null);

    try {
      // Send the user input (searchQuery) to the backend
      const response = await axios.get('/api/notions/search', {
        params: {
          query: keyword,
        },
      });

      setResults(response.data.Data);  // Set the results from the API
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
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

      <div>


        {results.map((notion,) => (
          <div>

            <li key={notion.item_attributes.upc}></li>

            <li>{notion.item_attributes.title}</li>
            <li>{notion.item_attributes.brand}</li>
            <li>{notion.item_attributes.color}</li>
            <img src={`${notion.item_attributes.image}`}></img>
            <button>Add to Notion Stash</button>
          </div>
        ))}


      </div>
    </div>
  );
}
export default SearchApi