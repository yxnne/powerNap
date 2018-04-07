import React from 'react';
import { WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { getUserNotesById, deleteOneNote, resetRedirectFlag } from '../../redux/notes.redux';
import { getDescInfo, transferDateStamp } from '../../util/common_util';
import CardNote from '../card_note/card_note';

/**
 * Notes, All the user's notes display
 */
 @connect(
   state=>state, { getUserNotesById, deleteOneNote, resetRedirectFlag }
 )
class Notes extends React.Component{

  componentDidMount(){
    // find that some times has no data because the userid is not got from server
    // so add setTimeout , not a pefect way, but now the way is useful
    this.props.getUserNotesById({userid:this.props.user._id})
    setTimeout(
      ()=>(
        this.props.getUserNotesById({userid:this.props.user._id})
      ),500
    );
    // Reset the save ok redirect flag
    // it is a bug recover in edit page
    this.props.resetRedirectFlag();
  }

  handleClickMore(noteid){
    this.props.history.push(`/noteedit/${noteid}`);
  }

  handleDeleteClick(id){
    this.props.deleteOneNote({noteid:id});
  }

  render(){
    return (
      <div>
        <WingBlank size="lg">
          {
            this.props.notes.notes.map(item=>(
              <CardNote key={item._id} title={item.title}
                handleMore={()=>{this.handleClickMore(item._id)}}
                handleDelete={()=>{this.handleDeleteClick(item._id)}}
                body={getDescInfo(item)}
                footerContent={"update: "+ transferDateStamp(new Date(item.update_time))}
              />
            ))
          }
        </WingBlank>
        {/* This DIV is necessary */}
        <div style={{height:60}}></div>
      </div>
    );
  }
}

export default Notes;
