import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';
/**
 * This is an UI Component for View an Card of Note
 */
class CardNote extends React.Component{

  render(){
    return (
      <div>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title={this.props.title}
            thumb={this.props.thumb}
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>{this.props.body}</div>
          </Card.Body>
          <Card.Footer content={this.props.footerContent} extra={this.props.footerExtra} />
        </Card>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default CardNote;
