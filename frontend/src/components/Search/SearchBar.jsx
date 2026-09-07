import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FoodsContext } from '../../Context/FoodsContext';

const SearchBar = () => {
    const { foods } = useContext(FoodsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filtered = foods.filter(food =>
            food.name.toLowerCase().includes(term) ||
            (Array.isArray(food.tags) && food.tags.some(tag => tag.toLowerCase().includes(term)))
        );

        setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    };


    const handleSelect = (productName) => {
        navigate(`/search/${productName}`);
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleSearchClick = () => {
        if (searchTerm.trim() !== '') {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
            setSuggestions([]);
        }
    };

    return (
        <div className="fixed top-[4.5rem] left-0 right-0 bg-white border-t border-[var(--color-line)] p-6 flex flex-col items-center shadow-xl z-40">
            <div className="flex w-full max-w-xl justify-center">
                <input
                    type="search"
                    placeholder="Search here…"
                    className="rounded-full border border-[var(--color-line)] px-4 py-2.5 w-full focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button
                    className="bg-[var(--color-ink)] rounded-full ml-2 px-4 flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"
                    onClick={handleSearchClick}
                >
                    <FaSearch className="text-white" />
                </button>
            </div>

            {suggestions.length > 0 && (
                <ul className="bg-white border border-[var(--color-line)] w-full max-w-xl mt-2 rounded-2xl overflow-hidden">
                    {suggestions.map((item) => (
                        <li
                            key={item._id}
                            className="p-3 hover:bg-[var(--color-paper-soft)] cursor-pointer text-sm text-[var(--color-ink)] border-b border-[var(--color-line)] last:border-none"
                            onClick={() => handleSelect(item.name)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
