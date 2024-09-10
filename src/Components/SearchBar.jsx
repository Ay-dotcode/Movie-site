import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import searchIcon from '../assets/search.svg';

function SearchBar({ searchMovies }) {
    const [search, setSearch] = useState('');
    const inputRef = useRef(null); // Create a ref for the input field

    // Function to handle search and blur the input to close the keyboard
    const handleSearch = () => {
        if (inputRef.current) {
            inputRef.current.blur(); // Close the keyboard on mobile devices
        }
        searchMovies(search);
    };

    return (
        <div className="search">
            <input
                type="text"
                ref={inputRef} // Attach the ref to the input field
                value={search}
                placeholder="Search for a movie"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <img
                src={searchIcon}
                alt="search"
                onClick={handleSearch}
            />
        </div>
    );
}

SearchBar.propTypes = {
    searchMovies: PropTypes.func.isRequired,
};

export default SearchBar;
