import React, { Component } from 'react';
import { Grid, Header, Button, Card, Icon } from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';

export default class Index extends Component {
  render() {
    return (
      <div className="login-form">
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
          <style>{`
            body, div#__next, div.login-form {
              height: 100%;
            }
          `}</style>
        </Head>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" color="blue" textAlign="center">
              Hello, BCC!
            </Header>
            <p>Selamat instalasi kamu berhasil!</p>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
