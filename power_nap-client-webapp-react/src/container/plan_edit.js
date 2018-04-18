import React from 'react';
import { Modal, NavBar, Button, Icon,  List, InputItem, WhiteSpace, WingBlank, TextareaItem, Radio, DatePicker } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PlanStageSteps from '../component/plan_stage_steps/plan_stage_steps';
import AddStageModal from '../component/add_stage_modal/add_stage_modal';
import { addOnePlan, updateOnePlan } from '../redux/plans.redux'

/**
 * PlanEdit is for One Plan to Edit
 */
 @connect(
   state=>state, { addOnePlan, updateOnePlan }
 )
class PlanEdit extends React.Component{

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
    if ( planid !== 'new') {
      // This means to load old one
      const thePlan = this.props.plans.plans.find(i => i._id === planid );
      // console.log("this.props.notes.notes",this.props.notes.notes);
      this.setState({
        ...thePlan
      });
    }
  }

  handleBackClick(){
    this.props.history.push('/plans');
  }

  handleSaveClick(){
    // console.log('s_time', this.state.start_time.getTime());
    // ask if need sart this plan now
    if ( this.props.match.params.planid === 'new'){
      // new plan
      Modal.alert('Start This Plan Now?', 'Choose Start you will make this Plan a Started State, if you Need to Start It Later, Choose The No,Thanks Button', [
        { text: 'No,Thanks', onPress: () => {
          this.setState({state:'NO_START'});
          this.savePlan('NO_START');
        }, style: 'default' },
        { text: 'Start', onPress: () => {
          this.setState({state:'STARTED'});
          this.savePlan('STARTED');
        } },
      ]);
    } else {
      // update plan
      this.updatePlan();
    }
  }
  savePlan(state){
    // post data
    const saveData = {
       userid:this.props.user._id,
       ...this.state,
       start_time:this.state.start_time?this.state.start_time.getTime():null,
       plan_time:this.state.plan_time?this.state.plan_time.getTime():null,
       state
    };

    this.props.addOnePlan(saveData);
  }

  updatePlan(){
    // post data
    // Here, we don't need update the plan's state
    const updateData = {
       planid:this.props.match.params.planid,
       ...this.state,
       start_time:this.state.start_time?this.state.start_time.getTime():null,
       plan_time:this.state.plan_time?this.state.plan_time.getTime():null,
    };

    this.props.updateOnePlan(updateData);
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

  // new step prompt a modal
  // handleNewStep(){
  //   Modal.prompt(
  //     'Login',
  //     'Please input login information',
  //     (login, password) => console.log(`login: ${login}, password: ${password}`),
  //     'login-password',
  //     null,
  //     ['Please input name', 'Please input password'],
  //   );
  // }

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
    // if (this.props.notes.res === 0) {
    //   Toast.success('Note Saved Success ', 1);
    //
    // } else if (this.props.notes.res === 1){
    //   Toast.fail(this.props.notes.msg, 1);
    // }




    return (
      <div>
        { this.props.plans.okBack? <Redirect to='/plans' />:null}
        <NavBar className="fixed-header" mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.handleBackClick.bind(this)}
          rightContent={[
            <Icon  style={{ marginRight: '16px' }} type="ellipsis" key="nav_icon_info"
              onClick={this.handleInfoClick.bind(this)}/>,
            <Icon type="check" key="nav_icon_save" onClick={this.handleSaveClick.bind(this)}/>
          ]}>{ 'Plan Edit' }</NavBar>

        <div  className="tab_center_coantainer">

          {/* Basic info Section */}
          <WhiteSpace size='lg'/>
          <List>
            <WingBlank>
              <InputItem
                placeholder="Here is the Plan Name"
                value={this.state.name}
                onChange={(v)=>{this.handleOnChange('name', v)}}
              >Plan</InputItem>

              <InputItem
                placeholder="What is the Plan's Target?"
                value={this.state.target_desc}
                onChange={(v)=>{this.handleOnChange('target_desc', v)}}
              >Target</InputItem>


              <TextareaItem
                title="Detail"
                placeholder="More Details Description"
                value={this.state.desc}
                onChange={(v)=>{this.handleOnChange('desc', v)}}
                rows={3}
                count={1000}
              />

              <Radio.RadioItem key="isPublic" checked={this.state.isPublic} onClick={()=>{this.handleRadioClick(true)}}>
                Public
                <List.Item.Brief>Check Here will make This Plan PUBLIC for friends </List.Item.Brief>
              </Radio.RadioItem>
              <Radio.RadioItem key="isPrivate" checked={!this.state.isPublic} onClick={()=>{this.handleRadioClick(false)}}>
                Private
                <List.Item.Brief>Check Here will make This Plan Private </List.Item.Brief>
              </Radio.RadioItem>

              <DatePicker
                 mode="date"
                 title="Select Date"
                 extra="Optional"
                 value={this.state.start_time}
                 onChange={(v)=>{this.handleOnChange('start_time', v)}}
              ><List.Item arrow="horizontal">Start Time</List.Item>
              </DatePicker>

              <DatePicker
                 mode="date"
                 title="Select Date"
                 extra="Optional"
                 value={this.state.plan_time}
                 onChange={(v)=>{this.handleOnChange('plan_time', v)}}
              ><List.Item arrow="horizontal">Plan Finish</List.Item>
              </DatePicker>

            </WingBlank>
          </List>

          {/* Stage Section */}
          <WhiteSpace size='lg'/>

          <div style={{background:"white", paddingTop:"10px", paddingBottom:"10px"}}>
            <WingBlank>
              <PlanStageSteps
                stages={this.state.stages}
                model="edit"
              />
              <WhiteSpace size='lg'/>
              <Button type="ghost" onClick={()=>{this.setState({modal_add_new_visible:true})}}>New One Step of This Plan</Button>
              <WhiteSpace size='lg'/>
            </WingBlank>
          </div>


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

export default PlanEdit;
