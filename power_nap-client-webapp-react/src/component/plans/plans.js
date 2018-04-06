import React from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import PlanCard from '../card_plan/card_plan';
import { transferDateStamp } from '../../util/common_util';
import { getUserPlansById, deleteOneNote } from '../../redux/plans.redux'

/**
 * Plans Is the Plan's List Component
 */
@connect(
  state=>state, { getUserPlansById, deleteOneNote }
)
class Plans extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    // find that some times has no data because the userid is not got from server
    // so add setTimeout , not a pefect way, but now the way is useful
    this.props.getUserPlansById({userid:this.props.user._id})
    setTimeout(
      ()=>(
        this.props.getUserPlansById({userid:this.props.user._id})
      ),500
    );
  }

  handleClickMore(planid){
    this.props.history.push(`/plandetail/${planid}`);
  }

  handleDeleteClick(id){
    this.props.deleteOneNote({planid:id});
  }

  render() {

    return (
      <div>
        <WingBlank size="lg">
          {
            this.props.plans.plans.map(item=>(
              <PlanCard key={item._id} name={item.name}
                plan_time={item.plan_time}
                start_time={item.start_time}
                handleMore={()=>{this.handleClickMore(item._id)}}
                handleDelete={()=>{this.handleDeleteClick(item._id)}}
                footerContent={"update: "+ transferDateStamp(new Date(item.update_time))}
                state={item.state}
                desc={item.desc}
                isPublic={item.isPublic}
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

export default Plans;
