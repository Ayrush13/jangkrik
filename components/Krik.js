import React, { Component } from 'react';
import { Icon, Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import Link from 'next/link';

export default class Krik extends Component {
  render() {
    return (
      <Card fluid>
        <Link href={'/krik?index=' + this.props.index}>
          <Card.Content style={{ cursor: 'pointer' }}>
            <Image src={this.props.avatar} avatar size="huge" floated="right" />
            <span style={{ fontWeight: 'bold', marginRight: 10 }}>
              {this.props.name}
            </span>
            <span>@{this.props.username}</span>
            <span style={{ display: 'block', color: 'grey' }}>
              {moment(this.props.time).calendar()}
            </span>
            <Card.Description style={{ whiteSpace: 'pre-line' }}>
              {this.props.krik}
            </Card.Description>
          </Card.Content>
        </Link>
        <Card.Content extra>
          <a
            onClick={() => {
              this.props.toggleLike(this.props.index);
            }}
          >
            <Icon
              name={this.props.liked ? 'heart' : 'empty heart'}
              style={this.props.liked ? { color: 'red' } : {}}
            />
            <span style={this.props.liked ? { color: 'red' } : {}}>
              {this.props.like} Like{this.props.like > 1 ? 's' : ''}
            </span>
          </a>
          <Link href={'/krik?index=' + this.props.index}>
            <a style={{ marginLeft: 15 }}>
              <Icon name="reply" />
              Reply
            </a>
          </Link>
        </Card.Content>
      </Card>
    );
  }
}
