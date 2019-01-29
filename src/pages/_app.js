import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';
import withMobxStore from '../lib/withMobxStore';
import '../lib/Array';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();

    // this.props.mobxStore.initApp();
  }

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, mobxStore } = this.props;
    return (
      <html>
        <head>
          <link href="//use.fontawesome.com/releases/v5.2.0/css/all.css" rel="stylesheet" />
          <link href="//fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
          <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link
            href="//stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css"
            rel="stylesheet"
          />
        </head>
        <Container>
          <Provider store={mobxStore}>
            <JssProvider
              registry={this.pageContext.sheetsRegistry}
              generateClassName={this.pageContext.generateClassName}
            >
              <MuiThemeProvider
                theme={this.pageContext.theme}
                sheetsManager={this.pageContext.sheetsManager}
              >
                <CssBaseline />
                <Component pageContext={this.pageContext} {...pageProps} />
              </MuiThemeProvider>
            </JssProvider>
          </Provider>
        </Container>
      </html>
    );
  }
}

export default withMobxStore(MyApp);
