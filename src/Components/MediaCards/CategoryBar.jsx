import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}))

const CategoryBar = inject('mediaStore')(observer((props) => {

    const { mediaStore } = props
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    useEffect(() => {
        mediaStore.getTrending(categories[value].url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const categories = [
        { name: 'All', url: 'All' },
        { name: 'Live', url: '' },
        { name: 'Sports & Fitness', url: 'Sports & Fitness' },
        { name: 'Art', url: 'Art' },
        { name: 'Beauty', url: 'Beauty & Body Art' },
        { name: 'Talk Shows', url: 'Talk Shows & Podcasts' },
        { name: 'Food & Drink', url: 'Food & Drink' },
        { name: 'Science', url: 'Science & Technology' },
        { name: 'Travel', url: 'Travel & Outdoors' }
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue)
        mediaStore.getTrending(categories[newValue].url)
        console.log(categories[value].url)
    }

    return (
        <div className={classes.root}>
            <AppBar
                position='sticky'
                style={{
                    paddingTop: 10,
                    zIndex: 2,
                }}
                color='default'
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='scrollable'
                    scrollButtons='auto'
                >
                    {categories.map((category) => {
                        return <Tab key={category} label={category.name} {...a11yProps(0)} />
                    })}
                </Tabs>
            </AppBar>
        </div>
    )
})
)

export default CategoryBar
