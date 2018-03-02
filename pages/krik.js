import React, { Component } from 'react';
import {
  Icon,
  Header,
  Container,
  Card,
  Image,
  Form,
  Button,
} from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import { kriks } from '../data/kriks';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      kriks,
    };
  }

  toggleLike(index) {
    kriks[index].liked = !kriks[index].liked;
    kriks[index].like += kriks[index].liked ? 1 : -1;
    this.setState({ kriks });
  }

  render() {
    const index = this.props.url.query.index;
    return (
      <div>
        <Head>
          <title>Jangkrik</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
          <style>{`
            body {
              background-color: rgb(230, 236, 240);
            }
          `}</style>
        </Head>
        <Container style={{ width: 550, paddingTop: 20, paddingBottom: 20 }}>
          <Link href="/">
            <a>
              <Header as="h2">
                <Icon name="bug" />
                <Header.Content>Jangkrik</Header.Content>
              </Header>
            </a>
          </Link>
          <Card fluid>
            <Card.Content>
              <Image
                src={kriks[index].avatar}
                avatar
                size="huge"
                floated="right"
              />
              <span style={{ fontWeight: 'bold', marginRight: 10 }}>
                {kriks[index].name}
              </span>
              <span>@{kriks[index].username}</span>
              <span style={{ display: 'block', color: 'grey' }}>
                {moment(kriks[index].time).calendar()}
              </span>
              <Card.Description style={{ whiteSpace: 'pre-line' }}>
                {kriks[index].krik}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a onClick={() => this.toggleLike(index)}>
                <Icon
                  name={kriks[index].liked ? 'heart' : 'empty heart'}
                  style={kriks[index].liked ? { color: 'red' } : {}}
                />
                <span style={kriks[index].liked ? { color: 'red' } : {}}>
                  {kriks[index].like} Like{kriks[index].like > 1 ? 's' : ''}
                </span>
              </a>
            </Card.Content>
          </Card>
          <Card fluid>
            <Card.Content style={{ display: 'flex', flexDirection: 'row' }}>
              <Image
                src="https://api.adorable.io/avatars/100/km.png"
                avatar
                size="huge"
                floated="left"
              />
              <Form style={{ flex: 1 }}>
                <Form.TextArea
                  error={this.state.input.length > 160}
                  autoHeight
                  rows={2}
                  placeholder="Tulis krik balasanmu disini"
                  value={this.state.input}
                  onInput={event =>
                    this.setState({ input: event.target.value })
                  }
                />
              </Form>
            </Card.Content>
            <Card.Content
              extra
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <span
                style={{
                  marginRight: 10,
                  color: this.state.input.length > 160 ? 'red' : 'black',
                }}
              >
                {this.state.input.length} / 160
              </span>
              <Button circular color="blue" onClick={() => alert('Fungsi ini kita bahas di pertemuan 2')}>
                Reply <Icon style={{ marginLeft: 5 }} name="send" />
              </Button>
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}
