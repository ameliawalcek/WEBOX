import React from 'react';
import { observer, inject } from 'mobx-react'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const CategoryBar = inject('userStore', 'mediaStore')(observer((props) => {
    const categories = ['All', 'Gaming', 'Music', 'Art', 'Fitness', 'News', 'Movies']

    const changeCategory = (category) => {
        props.mediaStore.getTrending(category)
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Grid container justify="space-around" spacing={2}>
                    {categories.map(category => {
                        return <Grid >
                            <Button onClick={()=> changeCategory(category)} size="small" variant="contained" color="default">
                                {category}
                            </Button>
                        </Grid>
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
}))
export default CategoryBar;