import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import { useStyles } from "../styles/style";

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

const CategoryBar = inject('mediaStore')(observer((props) => {

    const { mediaStore } = props
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const categories = [
        { name: 'All', url: 'All' },
        { name: 'Live', url: '' },
        { name: 'Sports & Fitness', url: 'Sports %26 Fitness' },
        { name: 'Art', url: 'Art' },
        { name: 'Beauty', url: 'Beauty %26 Body Art' },
        { name: 'Talk Shows', url: 'Just Chatting' },
        { name: 'Food & Drink', url: 'Food %26 Drink' },
        { name: 'Science', url: 'Science %26 Technology' },
        { name: 'Travel', url: 'Travel %26 Outdoors' }
    ]

    mediaStore.setCategory(categories[value].url)

    const handleChange = (event, newValue) => setValue(newValue)

    return (
        <div className={classes.rootMediaTwo}>
            <AppBar
                position='sticky'
                style={{ paddingTop: 60, zIndex: 2 }}
                color='default'
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='secondary'
                    textColor='secondary'
                    variant='scrollable'
                    scrollButtons='auto'
                    TabIndicatorProps={{ style: { height: "5px" } }}                >
                    {categories.map((category) => {
                        return <Tab key={category.name} label={category.name} {...a11yProps(0)} />
                    })}
                </Tabs>
            </AppBar>
        </div>
    )
})
)

export default CategoryBar