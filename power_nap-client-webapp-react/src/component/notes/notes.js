import React from 'react';
import { WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { getUserNotesById } from '../../redux/notes.redux';
import { getDescInfo, transferDateStamp } from '../../util/common_util';
import CardNote from '../card_note/card_note';

/**
 * Notes, All the user's notes display
 */
 @connect(
   state=>state, { getUserNotesById }
 )
class Notes extends React.Component{

  componentDidMount(){
    // find that some times has no data because the userid is not got from server
    // so add setTimeout , not a pefect way, but now the way is useful
    this.props.getUserNotesById({userid:this.props.user._id})
    setTimeout(
      ()=>(
        this.props.getUserNotesById({userid:this.props.user._id})
      ),1000
    );
  }


  render(){
    return (
      <div>
        <WingBlank size="lg">
          {
            this.props.notes.notes.map(item=>(
              <CardNote key={item._id} title={item.title}
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
