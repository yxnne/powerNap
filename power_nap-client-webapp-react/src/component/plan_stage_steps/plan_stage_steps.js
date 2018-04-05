import React from 'react';
import { Steps, Button, Flex, WingBlank, TextareaItem } from 'antd-mobile';
const Step = Steps.Step;
/**
 * This is the UI Component For Set The Steps and Stage of A Plan
 */
class PlanStageSteps extends React.Component{

  render(){
    // Step's Description Section
    // Make Some Button and Text
    const stepDescSection = (desc) => {
      return (
        <div>
          <p style={{wordWrap:'break-word'}}>{desc}</p>

          <Flex>
            <Flex.Item></Flex.Item>
            <Flex.Item align="end">
              <Button inline type="primary" size="small" style={{marginRight:"12px"}}>
              edit</Button>
              <Button inline type="warning" size="small" style={{marginRight:"12px"}}>
              delete</Button>
            </Flex.Item>
          </Flex>
        </div>
      );
    };


    return (
      <WingBlank >
        <Steps  current={0}>
          {
            this.props.stages.map((item,index)=>{
              return (
                <Step key={index} title={item.name} description={stepDescSection(item.desc)} />
              )
            })
          }


        </Steps>

      </WingBlank>
    );
  }

}

export default PlanStageSteps;
