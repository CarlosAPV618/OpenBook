import { useMemo } from 'react';
import {
    makeStyles,
    useMediaQuery,
    createTheme
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '100%',
        flexShrink: 0,
        textAlign: 'center'
    }
}));

const useAccordionStyles = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = useMemo(() =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode])

    const classes = useStyles()

    return {
        theme, 
        classes
    }
}

export default useAccordionStyles