import React from 'react'
import { observer, inject } from 'mobx-react'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from "../styles/style";

const SearchBar = inject('mediaStore')(observer((props) => {
    const classes = useStyles()

    const handleSearch = ({ target }) => {
        props.mediaStore.resetTrending()
        props.mediaStore.handleSearch(target.value)
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
                onChange={handleSearch}
            />
        </div>
    )
}))

export default SearchBar