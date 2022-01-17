import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: '400',
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: '400',
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#3d99a1' : '#dd4500',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar className={classes.navbar} position="static">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <span>
                <span>Theme</span>
                <Switch
                  checked={darkMode}
                  onChange={darkModeChangeHandler}
                ></Switch>
              </span>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          All rights reserved. Next amazona
        </footer>
      </ThemeProvider>
    </div>
  );
}
