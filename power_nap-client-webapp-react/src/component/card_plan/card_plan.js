import React from 'react';
import { Card, WhiteSpace, Icon, Popover, Modal, Progress } from 'antd-mobile';
import { getPercentValue } from '../../util/common_util';

import './card_plan.css';


const PLAN_STATE_STARTED = 'STARTED';
const PLAN_STATE_FINSHED = 'FINSHED';
const PLAN_NO_START = 'NO_START';
/**
 * This is an UI Component for View an Card of Plan
 */
class CardPlan extends React.Component {

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

    // console.log(opt.key);
    // Do by the opt.key
    if ( opt.key === 'delete') {
      Modal.alert('Delete', 'Are you sure???', [
        { text: 'Cancel', onPress: () => console.log('cancel') },
        {
          text: 'Ok',
          onPress: () =>{
            this.props.handleDelete();
          }
        },
      ]);
    } else if (opt.key === 'share'){

    }

  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  // handleMore(){
  //   // Push to the page edit
  //   this.props.history.push('/');
  //
  // }

  render(){
    // Card Footer Extra Popover Button
    const Item = Popover.Item;
    const iconImg = src => <img src={require(`./img/${src}.svg`)} className="am-icon am-icon-xs" alt="" />;

    const footerExtra = (
      <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (<Item key="share" value="scan" icon={iconImg('share')} data-seed="logId">Share</Item>),
              (<Item key="delete" value="special" icon={iconImg('delete')} style={{ whiteSpace: 'nowrap' }}>Delete</Item>)
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

    // Calculate the Progress
    let progress_value = 0;
    switch (this.props.state) {
      case PLAN_NO_START:
        progress_value = 0;
        break;
      case PLAN_STATE_STARTED:
        const total = this.props.plan_time - this.props.start_time;
        const current = new Date().getTime() - this.props.start_time;
        progress_value = getPercentValue( current, total ) ;
        break;
      case PLAN_STATE_FINSHED:
        progress_value = 100;
        break;
      default:
        progress_value = 0;
    }


    return (



      <div>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header

            title={this.props.name}
            thumb={this.props.thumb}
            extra={<span onClick={this.props.handleMore}>more ></span>}
          />
          <Progress percent={progress_value} position="normal" />
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

export default CardPlan ;
