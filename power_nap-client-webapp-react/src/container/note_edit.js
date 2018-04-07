import React from 'react';
import { NavBar, Icon,  List, InputItem, WhiteSpace, WingBlank, TextareaItem, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addOneNote, updateOneNote } from '../redux/notes.redux'

/**
 * NoteEdit is for One Note to Edit or just See
 */
 @connect(
   state=>state, { addOneNote, updateOneNote }
 )
class NoteEdit extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      title:'',
      content:''
    };
  }
  componentDidMount(){

    // get Router params note id and find note in the Notes
    // and set it to the state
    const noteid = this.props.match.params.noteid;
    if ( noteid !== 'new') {
      // This means to load old one
      const theNote = this.props.notes.notes.find(i => i._id === noteid );
      console.log("this.props.notes.notes",this.props.notes.notes);
      this.setState({
        title:theNote.title,
        content:theNote.content
      });
    }
  }

  handleBackClick(){
    this.props.history.push('/notes');
  }

  handleSaveClick(){
    //console.log('this.props.user.userid', this.props.user._id);
    const noteid = this.props.match.params.noteid;
    if ( noteid !== 'new' ) {
      // update note
      const noteData = {
        noteid:noteid,
        title:this.state.title,
        content:this.state.content
      };
      this.props.updateOneNote(noteData);
    } else {
      // new note
      const noteData = {
        userid:this.props.user._id,
        title:this.state.title,
        content:this.state.content
      };
      this.props.addOneNote(noteData);
    }


  }

  handleInfoClick(){
    console.log('handle click');
  }

  handleOnChange(key, value){
    this.setState({
      [key]:value
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
        { this.props.notes.okBack? <Redirect to='/notes' />:null}

        <NavBar className="fixed-header" mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.handleBackClick.bind(this)}
          rightContent={[
            <Icon  style={{ marginRight: '16px' }} type="ellipsis" key="nav_icon_info"
              onClick={this.handleInfoClick.bind(this)}/>,
            <Icon type="check" key="nav_icon_save" onClick={this.handleSaveClick.bind(this)}/>
          ]}>{ 'A Note' }</NavBar>

        <div  className="tab_center_coantainer">
          <WhiteSpace size='lg'/>

          <List>
            <WingBlank>

              <InputItem
                placeholder="Here is the Title"
                value={this.state.title}
                onChange={(v)=>{this.handleOnChange('title', v)}}
              />
              <TextareaItem
                placeholder="Content here"
                value={this.state.content}
                onChange={(v)=>{this.handleOnChange('content', v)}}
                rows={20}
                count={100000}
              />
            </WingBlank>
          </List>
        </div>


      </div>
    );
  }
}

export default NoteEdit;
