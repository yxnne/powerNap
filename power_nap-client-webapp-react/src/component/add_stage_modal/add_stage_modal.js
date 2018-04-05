import React from 'react';
import { Modal, List, Button, InputItem, TextareaItem, WhiteSpace } from 'antd-mobile';

class AddStageModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  handleOnChange(key, value){
    this.setState({
      [key]:value
    });
  }

  handleComfirmClick(){
    this.props.onConfirm(this.state);
    this.props.onCancel();
    this.setState({
      name:'',
      desc:''
    });
  }

  render(){
    return (
      <Modal
        visible={this.props.visible}
        onClose={this.props.onCancel}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>New One Step of This Plan</div>} className="popup-list">

        <InputItem
          placeholder="What is the Step?"
          value={this.state.name}
          onChange={(v)=>{this.handleOnChange('name', v)}}
        >Step</InputItem>

        <TextareaItem
          title="Detail"
          placeholder="More Details Description"
          value={this.state.desc}
          onChange={(v)=>{this.handleOnChange('desc', v)}}
          rows={5}
          count={500}
        />


          <List.Item>
            <Button type="primary" onClick={()=>{this.handleComfirmClick()}}>Add This Step</Button>
            <WhiteSpace size='lg'/>
            <Button type="ghost" onClick={this.props.onCancel}>Cancel</Button>

          </List.Item>


        </List>
      </Modal>
    );
  }
}

export default AddStageModal;
