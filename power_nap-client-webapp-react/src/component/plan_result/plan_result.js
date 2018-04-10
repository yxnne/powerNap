import React from 'react';
import { Result } from 'antd-mobile';
import { PLAN_RESULT_NO_START, PLAN_RESULT_STARTED, PLAN_RESULT_FINISHED } from '../../util/consts';
import './plan_result.css';
/**
 * This is UI Component for Display the Plan Finished ? Started ? or NOT Started yet
 * Encapsulated the antd mobile Result
 */
class PlanResult extends React.Component{

  render () {
    // According to the state of plan
    // Display the Different Icon
    const stateIcon = (planState) => {
      switch (planState){
        case PLAN_RESULT_FINISHED:
          return (<img src={require('./img/result_finish.svg')} className="result_img" alt="" />);
        case PLAN_RESULT_NO_START:
          return (<img src={require('./img/result_not_start.svg')} className="result_img" alt="" />);
        case PLAN_RESULT_STARTED:
          return (<img src={require('./img/result_started.svg')} className="result_img" alt="" />);
        default:
          return null;
      }
    };

    // Display the Target and desc
    const msgSection = () => {
      return (
        <div>
          <p style={{wordWrap:'break-word',color:"#888"}}>Target:{this.props.target_desc}</p>
          <p style={{wordWrap:'break-word',color:"#888"}}>Detail:{this.props.desc}</p>
        </div>
      );
    };


    return (
      <Result className="plan-result"
        img={stateIcon(this.props.planState)}
        title={this.props.titleName}
        message={msgSection()}
      />
    );
  }
}

export default PlanResult;
