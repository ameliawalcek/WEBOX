import React from 'react'
import { observer, inject } from 'mobx-react'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from "../styles/style";

const SearchBar = inject('mediaStore')(observer((props) => {
    const classes = useStyles()

    const handleInput = ({ target }) => {
        props.mediaStore.searchInput = target.value
    }

    return (
        <div className={classes.searchSearch}>
            <div className={classes.searchIconSearch}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder='Search…'
                classes={{
                    root: classes.inputRootSearch,
                    input: classes.inputInputSearch,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInput}
            />
        </div>
    )
}))

export default SearchBar