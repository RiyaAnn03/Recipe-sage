import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { searchRecipe } from '../redux/Slices/recipeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Define routes where the search bar should be visible
  const showSearchBar = location.pathname === '/';

  return (
    <nav className="flex bg-red-500 fixed w-full p-5 text-white">
      <Link to={'/'} className="text-2xl font-bold">
        <i className="fa-solid fa-bowl-food"></i> Recipe Sage
      </Link>
      <ul className="flex-1 text-right">
        {/* Conditionally render the search bar */}
        {showSearchBar && (
          <li className="list-none inline-block px-5">
            <input
              style={{ width: '300px' }}
              onChange={(e) =>
                dispatch(searchRecipe(e.target.value.toLowerCase()))
              }
              className="rounded p-2 text-black"
              type="text"
              placeholder="Search by cuisine"
            />
          </li>
        )}
        <li className="list-none inline-block px-5">Recipes</li>
        <li className="list-none inline-block px-5">Contact</li>
      </ul>
    </nav>
  );
};

export default Header;
