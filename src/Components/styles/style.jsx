import { fade, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
    rootCreator: {
        width: '100%',
        height: 'auto'
    },
    paperCreator: {
        paddingTop: 60,
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 10
    },
    rootNotif: {
        flexGrow: 1,
        overflow: "hidden",
        height: '100vh',
        padding: theme.spacing(0, 3)
    },
    paperNotif: {
        maxWidth: 400,

        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2)
    },
    rootMedia: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    containerMedia: {
        marginTop: 5,
    },
    paperMedia: {
        height: '100vh'
    },
    paperTopMedia: {
        paddingTop: 52
    },
    customizeToolbar: {
        maxHeight: 55
    },
    iconMedia: {
        color: 'white',
    },
    rootMediaTwo: {
        flexGrow: 1,
        width: '100%',
    },
    buttonLanding: {
        width: 200,
        height: 40,
        margin: 15,
    },
    rootLanding: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 10,
        width: '90%',
        overflow: 'hidden',
        padding: 10,
    },
    inputLanding: {
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
    },
    searchSearch: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    loader: {
        left: '50%',
        top: '50%',
        marginLeft: -75,
        marginTop: -75,
        position: 'absolute'
    },
    searchIconSearch: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRootSearch: {
        color: 'inherit',
    },
    inputInputSearch: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    growHeader: {
        flexGrow: 1,
    },
    listHeader: {
        position: 'fixed',
        bottom: 30,
        left: 25
    },
    listHightHeader: {
        height: '100%'
    },
    menuButtonHeader: {
        marginRight: theme.spacing(2),
    },
    hideHeader: {
        display: 'none',
    },
    drawerHeader: {
        width: 180,
        flexShrink: 0,
    },
    drawerPaperHeader: {
        width: 180,
    },
    drawerHeaderHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    rootCreatorTwo: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    largeCreatorTwo: {
        height: 45,
        marginTop: 5,
        position: 'relative',
        left: 10,
        width: 45,
        bottom: 3
    },
    typography: {
        fontSize: 10,
    },
    typographyTwo: {
        fontSize: 11,
    },
    instagram: {
        display: 'flex',
        justifyContent: 'center',
        color: 'white'
    },
}))