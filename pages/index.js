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
import Krik from '../components/Krik';
import { addKrik, kriks } from '../data/kriks';

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

  newKrik() {
    if (this.state.input.length > 160 || this.state.input.length === 0) return;
    addKrik({
      time: new Date(),
      name: 'Krik Master',
      username: 'krikmaster2000',
      avatar: 'https://api.adorable.io/avatars/100/km.png',
      krik: this.state.input,
      like: 0,
      liked: false,
    });
    this.setState({ kriks, input: '' });
  }

  render() {
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
                  placeholder="Tulis krikmu disini"
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
              <Button circular color="blue" onClick={() => this.newKrik()}>
                Krik <Icon style={{ marginLeft: 5 }} name="send" />
              </Button>
            </Card.Content>
          </Card>
          {this.state.kriks.map((krik, i) => (
            <Krik {...krik} index={i} toggleLike={this.toggleLike.bind(this)} />
          ))}
        </Container>
      </div>
    );
  }
}
