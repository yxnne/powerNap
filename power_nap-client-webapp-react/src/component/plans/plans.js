import React from 'react';
import { WingBlank } from 'antd-mobile';
import PlanCard from '../card_plan/card_plan';
import { transferDateStamp } from '../../util/common_util';

const fake_data = [
  {
    name: 'plan A',
    desc: 'This is not about plan to ......',
    public: true,
    target_desc:'aim to NBA Final',
    tags:'A, B, C',
    state:'FINISHED',
    start_time:new Date().getTime() - 5 * 24 * 3600 * 1000,
    plan_time:new Date().getTime() + 3 * 24 * 3600 * 1000,
    update_time:new Date().getTime(),
    finish_time:new Date().getTime() - 1 * 24 * 3600 * 1000
  },
  {
    name: 'Real Man',
    desc: 'plan for loving, plan for Doing better everything, and have a better life',
    public: false,
    target_desc:'To be better man',
    tags:' C',
    state:'STARTED',
    start_time:new Date().getTime() - 50 * 24 * 3600 * 1000,
    plan_time:new Date().getTime() + 10 * 24 * 3600 * 1000,
    update_time:new Date().getTime(),
    finish_time:null
  },
  {
    name: 'plan C',
    desc: 'This is not about plan to ......',
    public: true,
    target_desc:'good good study, day day up',
    tags:'G, Z',
    state:'STARTED',
    start_time:new Date().getTime() - 2 * 24 * 3600 * 1000,
    plan_time:new Date().getTime() + 10 * 24 * 3600 * 1000,
    update_time:new Date().getTime(),
    finish_time:null
  },
  {
    name: 'Out of Time Plan',
    desc: 'Out of Time Plan Test to ......',
    public: true,
    target_desc:'Out of Time Plan Test to ......',
    tags:'G, Z',
    state:'STARTED',
    start_time:new Date().getTime() - 10 * 24 * 3600 * 1000,
    plan_time:new Date().getTime() - 7 * 24 * 3600 * 1000,
    update_time:new Date().getTime(),
    finish_time:null
  },

];

/**
 * Plans Is the Plan's List Component
 */
class Plans extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <WingBlank size="lg">
          {
            fake_data.map(item=>(
              <PlanCard key={item._id} name={item.name}
                plan_time={item.plan_time}
                start_time={item.start_time}
                footerContent={"update: "+ transferDateStamp(new Date(item.update_time))}
                state={item.state}
                desc={item.desc}
                public={item.public}
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
