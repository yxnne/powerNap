import React from 'react';
import './y-icon-input.css';
/**
 * YiconInput, View for my style input
 */
class YiconInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isFocus:false,
      needHintUp:false
    };
  }

  // when focus
  onInputFocus(){
    console.log("onFocus");
    this.setState({
      isFocus:true,
    });
  }
  // when unfocus
  onInputBlur(){
    this.setState({
      isFocus:false,
    });
  }

  render(){
    const height = this.props.height?this.props.height:20;
    const fontSize = height - 4  ;
    const imgStyle = this.state.isFocus
      ?{
        width:0,
        height:0
      }:{
        width:height,
        height:height
      };

    const inputContainerStyle = this.state.isFocus
      ?{
        width:"95%"
      }:{
        width:"80%"
      };

    const imgContainerStyle = this.state.isFocus
      ?{
        width:"0%"
      }:{
        width:"20%"
      };

      const inputStyle = {
        height:height,
        fontSize:fontSize,
        marginBottom:4
      };

      const inputType = this.props.type?
        this.props.type:"text";


    return (
      <div>
        
        <div className="y-top-section" >
          <span style={this.state.isFocus?{color:"#333"}:{color:"transparent"}}>
            {`${this.props.keyPlaceHolder?this.props.keyPlaceHolder:this.props.placeHolder}:`}
          </span>
        </div>
        
        <div className="y-middle-section">
          
          <span className="inner-img" style={imgContainerStyle}>
            <img  style={imgStyle} alt="input-info"
            src={this.props.img}/>
          </span>
          
          <span className="inner-input" style={inputContainerStyle}>
            <input style={inputStyle} type={inputType}
              placeholder={this.state.isFocus?"":this.props.placeHolder}
              onFocus={()=>this.onInputFocus()}
              onBlur={()=>this.onInputBlur()}
              onChange={(e)=>this.props.onChange(e.target.value)}
            />
          </span>

        </div>

        <div className="y-underline-section"></div>
      </div>
    );
  }
}

export default YiconInput;
