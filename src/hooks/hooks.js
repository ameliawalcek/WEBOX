import { createMuiTheme } from '@material-ui/core'
import { useEffect } from "react"
 
export const useScript = url => {
  const script = document.createElement('script')
 
  script.src = url
  script.async = true
 
  document.body.appendChild(script)
 
  useEffect(() => {
    return () => {
      document.body.removeChild(script)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
 
export const useTheme = darkState => {
  const palletType = darkState ? "dark" : "light"
  const mainPrimaryColor = darkState ? '#303030' : '#673ab7'
  const mainSecondaryColor = darkState ? '#954bb4' : '#009688'
 
  return createMuiTheme({
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
}
