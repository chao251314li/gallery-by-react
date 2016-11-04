require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var ReactDOM = require('react-dom')

var imageDatas = require('json!../data/imageDatas.json');

imageDatas = (function  genImageURL(imageDatasArr){
  for(var i = 0 , j = imageDatasArr.length; i<j ;i++){
    var singleImageDate = imageDatasArr[i];

    singleImageDate.imageURl = require('../images/' + singleImageDate.fileName);

    imageDatasArr[i]  = singleImageDate;
  }

  return imageDatasArr;
})(imageDatas);

function getRangeRandom(low,high){
  return Math.ceil(Math.random() * (high - low) + low);
}

//imageDatas = genImageURL(imageDatas)

class Imgfigure extends React.Component{
  render(){

    var styleObj = {};

    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos
    }
    return(
      <figure className='img-figure' style={styleObj}>
        <img height="240px" width="240px" src={this.props.data.imageURl} alt={this.props.data.title}/>
        <figcaption>
          <h2 className='img-title'>
            {this.props.data.title}
          </h2>
        </figcaption>
      </figure>
    );
  }
}

class AppComponent extends React.Component {

  constructor(props){
    super();
    this.state = {imgsArrangeArr:[]};
  }



  getInitialState(){
  return {
    imgsArrangeArr:[
      /*{
        pos:{
          left:'0',
          top:'0'
        }
      }*/
    ]
  }
}
  Constant:{
    centerPos:{
      left:0,
      top:0
    },
    hPosRange:{
      leftSecx:[0,0],
      rightSecx:[0,0],
      y:[0,0]
    },
    vPosRange:{
      x:[0,0],
      topY:[0,0]
    }
  }
  rearrange(centerIndex){
    var  imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecx = hPosRange.leftSecx,
      hPosRangeRightSecx = hPosRange.rightSecx,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangex = vPosRange.x,

      imgsArrangeTopArr = [],

      topImgNum = Math.ceil(Math.random() * 2),

      topImgSpliceIndex = 0,

      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

    imgsArrangeCenterArr[0].pos = centerPos;

    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));


    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);


  imgsArrangeTopArr.forEach(function(value,index){
    imgsArrangeTopArr[index].pos = {
      top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
      left:getRangeRandom(vPosRangex[0],vPosRangex[1])
    }
  });

  for(var i = 0 ,j= imgsArrangeArr.length,k = j / 2;i < j ;i++){
    var hPosRangeLORRX = null;
     if(i < k){
       hPosRangeLORRX = hPosRangeLeftSecx;
     }else{
       hPosRangeLORRX = hPosRangeRightSecx;
     }

     imgsArrangeArr[i].pos = {
       top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
       left:getRangeRandom(hPosRangeLORRX[0],hPosRangeLORRX[1])
     }
  }
  if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
    imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr);
  }


  imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
  this.setState({
    imgsArrangeArr:imgsArrangeArr
  })


  }
  componentDidMount(){
  var stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    console.log(stageDOM);
    var stageW = stageDOM.style.width,
    stageH = stageDOM.style.height ,
    halfStageW = Math.ceil(stageW / 2),
    halfStageH = Math.ceil(stageH / 2);

  var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    console.log(imgFigureDOM);
    var imgW = imgFigureDOM.style.width,
    imgH = imgFigureDOM.style.height ,
    halfImgW = Math.ceil(imgW / 2),
    halfImgH = Math.ceil(imgH / 2);
console.log(this.Constant);
  this.Constant.centerPos = {
    left: halfStageW - halfImgW,
    top: halfStageH - halfImgH
  }
  this.Constant.hPosRange.leftSecx[0] = -halfImgW;
  this.Constant.hPosRange.leftSecx[1] = halfStageW - halfImgW * 3;
  this.Constant.hPosRange.rightSecx[0] = halfStageW - halfImgW;
  this.Constant.hPosRange.rightSecx[1] = stageW - halfImgW;
  this.Constant.hPosRange.y[0] = -halfImgH;
  this.Constant.hPosRange.y[1] = stageH - halfImgH;

  this.Constant.vPosRange.topY[0] = -halfImgH;
  this.Constant.vPosRange.topY[0] = halfStageH - halfImgH * 3;
  this.Constant.vPosRange.x[0] = halfImgW - imgW;
  this.Constant.vPosRange.x[1] = halfImgW;

  this.rearrange(0);
}
  render() {

    var controllerUnits = [],
        imgFigures = [];

    imageDatas.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          }
        }
      }
      imgFigures.push(<Imgfigure data={value} ref={'imgFigure'+index} arrange = {this.state.imgsArrangeArr[index]}/>);
    }.bind(this));
    return (
      <section className='stage' ref='stage'>
        <section className='img-sec'>
            {imgFigures}
        </section>
        <nav className="controller-nav">
            {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
