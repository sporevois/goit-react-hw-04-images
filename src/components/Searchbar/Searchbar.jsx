import { Component } from "react";
import {GoSearch} from 'react-icons/go'
import styles from "../Searchbar/Searchbar.module.css"
import PropTypes from 'prop-types';

export default class Searchbar extends Component{
    
    state = {
        searchQuerry: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchQuerry } = this.state;
        if (searchQuerry.trim() === '') {
            alert('Please enter something to searh querry');
            return;
        }
        this.props.onSubmit(searchQuerry);
    }
    
    handleInput = (event) => {
        this.setState({ searchQuerry: event.currentTarget.value.toLowerCase() });
    }

    render() {
        const { searchQuerry } = this.state;
        const { handleInput, handleSubmit } = this;
        return(
            <header className="searchbar">
              <form className={styles.searchForm} onSubmit = {handleSubmit}>
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
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}