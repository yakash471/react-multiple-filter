import React, { useState } from 'react';

// Example arrays of games
const gamesArray1 = [
  { id: 1, name: 'Game A', category: 'Action', price: 20, rating: 4 },
  { id: 2, name: 'Game B', category: 'Puzzle', price: 10, rating: 5 },
];

const gamesArray2 = [
  { id: 3, name: 'Game C', category: 'Action', price: 30, rating: 3 },
  { id: 4, name: 'Game D', category: 'Adventure', price: 15, rating: 4 },
];

const MultiFilterGames = () => {
  // Store filters in an object, but leave them flexible
  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  // Dynamic filtering function based on filters object keys
  const filterGames = (games) => {
    return games.filter((game) => {
      return Object.keys(filters).every((filterKey) => {
        if (filterKey === 'priceRange') {
          // Check if price is within range
          return (
            game.price >= filters.priceRange[0] &&
            game.price <= filters.priceRange[1]
          );
        } else if (filterKey === 'category') {
          // Check if category matches
          return filters.category ? game.category === filters.category : true;
        } else if (filterKey === 'rating') {
          // Check if rating is met
          return filters.rating ? game.rating >= filters.rating : true;
        }
        return true; // Default to true if filter not recognized
      });
    });
  };

  // Filter both game arrays and combine results
  const combinedFilteredGames = [
    ...filterGames(gamesArray1),
    ...filterGames(gamesArray2),
  ];

  return (
    <div>
      <h2>Filters</h2>

      {/* Example filter inputs */}
      <div>
        <label>Price Range:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.priceRange ? filters.priceRange[0] : 0}
          onChange={(e) =>
            handleFilterChange('priceRange', [
              +e.target.value,
              filters.priceRange ? filters.priceRange[1] : 100,
            ])
          }
        />
        <input
          type="range"
          min="0"
          max="100"
          value={filters.priceRange ? filters.priceRange[1] : 100}
          onChange={(e) =>
            handleFilterChange('priceRange', [
              filters.priceRange ? filters.priceRange[0] : 0,
              +e.target.value,
            ])
          }
        />
      </div>

      <div>
        <label>Category:</label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Action">Action</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Adventure">Adventure</option>
        </select>
      </div>

      <div>
        <label>Rating:</label>
        <select
          value={filters.rating || ''}
          onChange={(e) => handleFilterChange('rating', +e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="1">1 Star & Up</option>
          <option value="2">2 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="4">4 Stars & Up</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <h2>Filtered Games</h2>
      <ul>
        {combinedFilteredGames.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MultiFilterGames;
