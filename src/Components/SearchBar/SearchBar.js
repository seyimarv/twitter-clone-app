import React from 'react'
import './Searchbar.scss'
import SearchIcon from '@material-ui/icons/Search'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const SearchBar = ({onSearchSubmit, onSearchChange, history}) => {

    return (
    <div className='searchInputContainer'>
       <KeyboardBackspaceIcon className='backButton' onClick={() => 
    history.goBack()} /> 
    <div className='searchInput'>

  
        <SearchIcon className='searchIcon' type='submit'  onClick={onSearchSubmit}/>
        <input placeholder='Search Twitter' type="text" onChange={onSearchChange}/>
   
     </div>
     </div>
    )
}

export default SearchBar