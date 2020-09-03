
import { orange, lightBlue, deepPurple, deepOrange } from "@material-ui/core/colors"
import { createMuiTheme } from '@material-ui/core'

const darkState = JSON.parse(localStorage.getItem('dark'))
const palletType = darkState ? "dark" : "light"
const mainPrimaryColor = darkState ? orange[500] : lightBlue[500]
const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500]

const darkTheme = createMuiTheme({
    palette: {
        type: palletType,
        primary: {
            main: mainPrimaryColor
        },
        secondary: {
            main: mainSecondaryColor
        }
    },
    overrides: {
        MuiButton: {
            text: {
                background: mainPrimaryColor
            }
        }
    }
})

const handleThemeChange = () => {
    // setDarkState(!darkState)
}

export default darkTheme