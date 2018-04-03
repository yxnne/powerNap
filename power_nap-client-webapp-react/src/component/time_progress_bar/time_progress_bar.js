import React from 'react';
import { Progress } from 'antd-mobile';
import './time_progress_bar.css';

/**
 * This is The UI Component for A progress bar
 * It will show the progress percent into deadline
 * Or the section beyond the deadline
 * It is encapsulated based antdmobile progress
 */
class TimeProgressBar extends React.Component {

  render () {
    const planTime = this.props.planTime;
    const startTime = this.props.startTime;
    const currentTime = this.props.currentTime;

    let inSectionStyle = { };
    let outSectionStyle = { };
    let inPercent = 100;
    if ( currentTime - planTime < 0 ) {
      // This means IN plan time
      outSectionStyle = { width:"0%" , display:"none"};
      inSectionStyle = { width:"100%" };
      inPercent = Math.round( ( currentTime - startTime) / (planTime - startTime) * 100 );
    } else {
      // OUT of plan Time
      const inWidthPercent = Math.round( (planTime - startTime) / ( currentTime - startTime) * 100 );
      const outWidthPercent = 100 - inWidthPercent;
      outSectionStyle = { width:`${outWidthPercent}%` };
      inSectionStyle = { width:`${inWidthPercent}%` };
    }

    return (
      <div>
        <div style={inSectionStyle} className="in_time_section">
          <Progress percent={inPercent} position="normal"/>
        </div>

        <div style={outSectionStyle} className="out_time_section">
          <Progress percent={98} position="normal"/>
        </div>

      </div>
    );
  }
}

export default TimeProgressBar;
