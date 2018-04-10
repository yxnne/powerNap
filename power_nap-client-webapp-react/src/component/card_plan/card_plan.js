import React from 'react';
import { Card, WhiteSpace, Icon, Popover, Modal, Progress } from 'antd-mobile';
import TimeProgressBar from '../time_progress_bar/time_progress_bar';
import { PLAN_RESULT_NO_START, PLAN_RESULT_STARTED, PLAN_RESULT_FINISHED } from '../../util/consts';
import './card_plan.css';

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
    const progressView = () => {
      switch (this.props.state) {
        case PLAN_RESULT_NO_START:
          return (
            <Progress percent={0} position="normal" />
          );

        case PLAN_RESULT_STARTED:
          // const total = this.props.plan_time - this.props.start_time;
          // const current = new Date().getTime() - this.props.start_time;
          // progress_value = getPercentValue( current, total ) ;

          return (
            <TimeProgressBar planTime={this.props.plan_time}
              startTime={this.props.start_time}
              currentTime={new Date().getTime()}
              position="normal" />
          );

        case PLAN_RESULT_FINISHED:
          return (
            <Progress percent={100} position="normal" />
          );

        default:
          return (
            <Progress percent={0} position="normal" />
          );
      }
    };

    return (
      <div>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title={this.props.name}
            thumb={this.props.thumb}
            extra={<span onClick={this.props.handleMore}>more ></span>}
          />
          { progressView() }
          <Card.Body>
            <div>
              <p>{this.props.desc}</p>

            </div>
          </Card.Body>
          <Card.Footer
            content={(
              <span style={{lineHeight:"130%"}}>
                <span >
                  <img alt="" style={{ width:"18px", marginRight:"12px" }} src={this.props.isPublic?require('./img/open_eye.svg'):require('./img/private_lock.svg')}/>
                </span>
                <span >
                  {this.props.footerContent}
                </span>
              </span>
            )} extra={footerExtra} />

        </Card>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default CardPlan ;
