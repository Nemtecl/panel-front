import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#ffe15b',
      main: '#ffaf25',
      dark: '#c78000',
      contrastText: '#fff',
    },
  },
});

export default muiTheme;
