import PropTypes from 'prop-types';
import { useState } from "react";
import searchIcon from '../assets/search.svg';

function SearchBar({ searchMovies }) {
    const [search, setSearch] = useState('');

    return (
        <>
            <div className="search">
                <input type="text" value={search}
                    placeholder="Search for a movie"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => (e.key === "Enter") && searchMovies(search)} />

                <img src={searchIcon} alt="search"
                    onClick={() => searchMovies(search)} />
            </div>
        </>
    )
}
SearchBar.propTypes = {
    searchMovies: PropTypes.func.isRequired
};

export default SearchBar