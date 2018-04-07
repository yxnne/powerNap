import React from 'react';
import { Accordion, Result, Modal, NavBar, Button, Icon,  List, WhiteSpace, WingBlank, DatePicker, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import PlanStageSteps from '../component/plan_stage_steps/plan_stage_steps';
import AddStageModal from '../component/add_stage_modal/add_stage_modal';
import TimeProgressBar from '../component/time_progress_bar/time_progress_bar';
import PlanResult from '../component/plan_result/plan_result';
import { addOnePlan } from '../redux/plans.redux'

/**
 * PlanEdit is for One Plan to Edit
 */
 @connect(
   state=>state, { addOnePlan }
 )
class PlanDetail extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name:'',
      target_desc:'',
      desc:'',
      isPublic:true,
      start_time:null,
      plan_time:null,
      stages:[{name:'Step1', desc:'This is for Test'}],
      modal_add_new_visible:false
    };
  }
  componentDidMount(){

    // get Router params plan id and find plan in the Notes
    // and set it to the state
    const planid = this.props.match.params.planid;
    const showPlan = this.props.plans.plans.find(item => item._id === planid );
    // transfer date temp
    showPlan.start_time = new Date(showPlan.start_time);
    showPlan.plan_time = new Date(showPlan.plan_time);

    this.setState({
      ...showPlan
    });

  }

  handleBackClick(){
    this.props.history.push('/plans');
  }

  handleSettingClick(){
    // push the router to plan edit
    // transfer the planid as param
    // console.log(this.props);
    this.props.history.push(`/planedit/${this.props.match.params.planid}`);

  }


  handleInfoClick(){
    // console.log('handle click');
  }

  handleOnChange(key, value){
    // console.log(key, value)
    this.setState({
      [key]:value
    });
  }

  handleRadioClick(isPublic){
    this.setState({
      isPublic:isPublic
    });
  }

  closeModal(){
    this.setState({
      modal_add_new_visible:false
    });
  }

  addOneStep(stageObject){
    // console.log(stageObject);
    this.setState({
      stages:[...this.state.stages, stageObject]
    });
  }

  render(){


    return (
      <div>
        <NavBar className="fixed-header" mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.handleBackClick.bind(this)}
          rightContent={[
              <span style={{color:'#1F90E6'}} onClick={this.handleSettingClick.bind(this)}>Stetting ></span>
          ]}>{ 'Plan Detail' }</NavBar>

        <div  className="tab_center_coantainer">

          {/* Basic info Result */}
          <WhiteSpace size='lg'/>
          <Accordion defaultActiveKey="0" >

            <Accordion.Panel header={this.state.state}>
              <WingBlank>
                <PlanResult
                  planState={this.state.state}
                  titleName={this.state.name}
                  desc={this.state.desc}
                  target_desc={this.state.target_desc}
                />
              </WingBlank>
            </Accordion.Panel>
            <Accordion.Panel header="Operation">
              <WingBlank>
                <Button style={{margin:"40px 40px"}}type="primary" size="small">Set Finished</Button>
              </WingBlank>
            </Accordion.Panel>

          </Accordion>

          {/* Basic info Plan's Time info */}
          <WhiteSpace size='lg'/>
          <Accordion defaultActiveKey="0" >
            <Accordion.Panel header="Plan Time Info" className="pad">
              <WingBlank>
                <List className="my-list">
                  <DatePicker
                    disabled
                     mode="date"
                     title="Select Date"
                     extra="Optional"
                     value={this.state.start_time}
                     onChange={(v)=>{this.handleOnChange('start_time', v)}}
                  ><List.Item arrow="horizontal">Start Time</List.Item>
                  </DatePicker>

                  <DatePicker
                    disabled
                     mode="date"
                     title="Select Date"
                     extra="Optional"
                     value={this.state.plan_time}
                     onChange={(v)=>{this.handleOnChange('plan_time', v)}}
                  ><List.Item arrow="horizontal">Plan Finish</List.Item>
                  </DatePicker>
                </List>
              </WingBlank>
              <TimeProgressBar planTime={this.state.plan_time}
                startTime={this.state.start_time}
                currentTime={new Date().getTime()}
                position="normal" />
            </Accordion.Panel>

          </Accordion>
          {/* Stage Section */}
          <WhiteSpace size='lg'/>

          <Accordion defaultActiveKey="0" >
            <Accordion.Panel>
              <div style={{background:"white", paddingTop:"10px", paddingBottom:"10px"}}>
                <WingBlank>
                  <PlanStageSteps
                    stages={this.state.stages}
                  />
                  <WhiteSpace size='lg'/>
                  <Button type="ghost" onClick={()=>{this.setState({modal_add_new_visible:true})}}>New One Step of This Plan</Button>
                  <WhiteSpace size='lg'/>
                </WingBlank>
              </div>
            </Accordion.Panel>
          </Accordion>

        </div>

      {/* Modal Add Stage  */}
      <AddStageModal
        visible={this.state.modal_add_new_visible}
        onConfirm={this.addOneStep.bind(this)}
        onCancel={this.closeModal.bind(this)}
      />
      </div>
    );
  }
}

export default PlanDetail;
