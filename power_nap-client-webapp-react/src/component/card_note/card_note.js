import React from 'react';
import { Card, WhiteSpace, Icon, Popover } from 'antd-mobile';

/**
 * This is an UI Component for View an Card of Note
 */
class CardNote extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      selected: '',
    };
  }

  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  handleMore(){
    console.log('handle more');
  }

  render(){
    // Card Footer Extra Popover Button
    const Item = Popover.Item;
    const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

    const footerExtra = (
      <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
              (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
              (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>Help</span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <span style={{ marginRight: '15px' }} >
              <Icon type="ellipsis" />
            </span>
          </Popover>
    );

    return (
      <div>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header

            title={this.props.title}
            thumb={this.props.thumb}
            extra={<span onClick={()=>{this.handleMore()}}>more ></span>}
          />
          <Card.Body>
            <div>{this.props.body}</div>
          </Card.Body>
          <Card.Footer content={this.props.footerContent} extra={footerExtra} />
        </Card>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default CardNote;
