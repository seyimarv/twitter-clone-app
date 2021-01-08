import React from 'react'
import './Searchbar.scss'
import SearchIcon from '@material-ui/icons/Search'

const SearchBar = ({onSearchSubmit, onSearchChange}) => {

    return (
    <div className='searchInputContainer'>
    <div className='searchInput'>
  
        <SearchIcon className='searchIcon' type='submit'  onClick={onSearchSubmit}/>
        <input placeholder='Search Twitter' type="text" onChange={onSearchChange}/>
   
     </div>
     </div>
    )
}

export default SearchBar