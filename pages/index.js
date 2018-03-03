import React, { Component } from 'react';
import {
  Icon,
  Header,
  Container,
  Card,
  Image,
  Form,
  Button,
  Loader,
} from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';
import firebase from 'firebase';
import initFirebase from '../firebase';
import Krik from '../components/Krik';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      kriks: [],
      loading: false,
      gettingData: true,
    };
  }

  componentDidMount() {
    initFirebase();

    this.db = firebase.database().ref('kriks');
    this.db.on('value', snapshot => {
      this.showKriks(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.db.off('value');
  }

  showKriks(snapshot) {
    const kriks = Object.entries(snapshot)
      .map(item => Object.assign({}, { key: item[0] }, item[1]))
      .reverse();

    this.setState({ kriks, gettingData: false });
  }

  async newKrik() {
    // check jumlah karakter
    if (this.state.input.length > 160 || this.state.input.length === 0) return;

    // ganti jadi loading
    this.setState({ loading: true });

    const newKrik = firebase
      .database()
      .ref('kriks/')
      .push();
    await newKrik.set({
      time: new Date().getTime(),
      name: 'Krik Master',
      username: 'krikmaster2000',
      avatar: 'https://api.adorable.io/avatars/100/km.png',
      krik: this.state.input,
      like: 0,
      liked: false,
    });

    // set state daftar kriks sama kosongkan input
    this.setState({ input: '', loading: false });
  }

  toggleLike(id, like, liked) {
    firebase
      .database()
      .ref('kriks/' + id + '/')
      .update({
        like: liked ? like - 1 : like + 1,
        liked: !liked,
      });
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
              <Form style={{ flex: 1 }} loading={this.state.loading}>
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
          {this.state.gettingData && <Loader active inline="centered" />}
          {this.state.kriks.map(krik => (
            <Krik
              id={krik.key}
              {...krik}
              toggleLike={this.toggleLike.bind(this)}
            />
          ))}
        </Container>
      </div>
    );
  }
}
