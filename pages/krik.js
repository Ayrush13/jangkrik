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
import moment from 'moment';
import Krik from '../components/Krik';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      loading: false,
      krik: null,
      replies: [],
    };
  }

  componentWillMount() {
    initFirebase();

    this.db = firebase.database().ref('kriks/' + this.props.url.query.id);
    this.db.on('value', snapshot => {
      this.showKrik(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.db.off('value');
  }

  showKrik(snapshot) {
    let replies = [];
    if (snapshot.replies) {
      replies = Object.entries(snapshot.replies).map(item =>
        Object.assign({}, { key: item[0] }, item[1]),
      );
      delete snapshot.replies;
    }

    this.setState({ krik: snapshot, replies });
  }

  toggleLike() {
    const id = this.props.url.query.id;
    const { like, liked } = this.state.krik;
    firebase
      .database()
      .ref('kriks/' + id + '/')
      .update({
        like: liked ? like - 1 : like + 1,
        liked: !liked,
      });
  }

  toggleLikeReply(id, like, liked) {
    const idKrik = this.props.url.query.id;
    firebase
      .database()
      .ref('kriks/' + idKrik + '/replies/' + id)
      .update({
        like: liked ? like - 1 : like + 1,
        liked: !liked,
      });
  }

  async newKrikReply() {
    // check jumlah karakter
    if (this.state.input.length > 160 || this.state.input.length === 0) return;

    // ganti jadi loading
    this.setState({ loading: true });

    const newKrik = firebase
      .database()
      .ref('kriks/' + this.props.url.query.id + '/replies')
      .push();
    await newKrik.set({
      time: new Date().getTime(),
      name: 'Krik Master 7777',
      username: 'krikmaster7777',
      avatar: 'https://api.adorable.io/avatars/100/asdasd.png',
      krik: this.state.input,
      like: 0,
      liked: false,
    });

    // set state daftar kriks sama kosongkan input
    this.setState({ input: '', loading: false });
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
          {this.state.krik === null && <Loader active inline="centered" />}
          {this.state.krik !== null && (
            <Krik
              isReply
              {...this.state.krik}
              toggleLike={() => this.toggleLike()}
            />
          )}
          {this.state.replies.map(krik => (
            <Krik
              isReply
              id={krik.key}
              {...krik}
              toggleLike={this.toggleLikeReply.bind(this)}
            />
          ))}
          {this.state.krik !== null && (
            <Card fluid>
              <Card.Content style={{ display: 'flex', flexDirection: 'row' }}>
                <Image
                  src="https://api.adorable.io/avatars/100/asdasd.png"
                  avatar
                  size="huge"
                  floated="left"
                />
                <Form style={{ flex: 1 }} loading={this.state.loading}>
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
                <Button
                  circular
                  color="blue"
                  onClick={() => this.newKrikReply()}
                >
                  Reply <Icon style={{ marginLeft: 5 }} name="send" />
                </Button>
              </Card.Content>
            </Card>
          )}
        </Container>
      </div>
    );
  }
}
