import { useState } from "react";
import {GoSearch} from 'react-icons/go'
import styles from "../Searchbar/Searchbar.module.css"
import PropTypes from 'prop-types';

const Searchbar = ({onSubmit}) => {
    const [searchQuerry, setSearchQuerry] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        (searchQuerry.trim() === '')?
            alert('Please enter something to searh querry'):
            onSubmit(searchQuerry);
    }
    
    const handleInput = (event) => {
        setSearchQuerry(event.target.value.toLowerCase());
    }

    return (
        <header className="searchbar">
            <form className={styles.searchForm}
                onSubmit={handleSubmit}>
                <button type="submit" className={styles.button}>
                    <GoSearch className={styles.searchIcon}/>
                </button>

                <input
                className={styles.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name = "searchQuerry"
                value = {searchQuerry}
                onInput={handleInput}
                />
            </form>
        </header>
    )
}
export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}