require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var imageDatas = require('json!../data/imageDatas.json');

imageDatas = (function  genImageURL(imageDatasArr){
  for(var i = 0 , j = imageDatasArr.length; i<j ;i++){
    var singleImageDate = imageDatasArr[i];

    singleImageDate.imageURl = require('../images/' + singleImageDate.fileName);

    imageDatasArr[i]  = singleImageDate;
  }

  return imageDatasArr;
})(imageDatas);

//imageDatas = genImageURL(imageDatas)

class AppComponent extends React.Component {
  render() {
    return (
      <section className='stage'>
        <section className='img-sec'>
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
