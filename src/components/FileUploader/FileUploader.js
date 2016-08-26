import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

export default class FileUploader extends Component{
     constructor(props) {
    super(props);
      this.uploadImage = this.uploadImage.bind(this);
      this.state={};
      this.state.images =[];
  }

  ajax(url,file) {

  return new Promise(function(resolve, reject) {
  var data = new FormData();
    data.append('SelectedFile', file);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            try {
                var resp = JSON.parse(request.response);
            } catch (e){
                var resp = {
                    status: 'error',
                    data: 'Unknown error occurred: [' + request.responseText + ']'
                };
            }
            console.log(resp.status + ': ' + resp.data);
        }
    };
     request.open('POST', url);
      request.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(request.response);
      } else {
        reject({
          status: this.status,
          statusText: request.statusText
        });
      }
    };
    request.onerror = function () {
      reject({
        status: this.status,
        statusText: request.statusText
      });
    };
    request.send(data);
});
}

 uploadImage(file)
  {  
          var that = this;
          var images=this.state.images;

      
    for(var i=0; i<file.target.files.length; i++)
    {
  var image = file.target.files[i];
    {


      this.ajax('http://localhost:8000/api/photo',image).then(function(result)
        {
          console.log(result);
       var  responseObj = JSON.parse(result);
         images.push(responseObj.url);
         that.setState({images:images});
        
      });
     
    }
        }
      }
   render() {
         var state = this.state;
    return (
      <div>
      <div>
{this.state && this.state.images.length>0 && this.state.images.map(function(image){
 return( <img src={image} style={{height: 100 + 'px',width:100+'px'}}></img>);
})
}
</div>
   <input type='file' refs='file' onChange={this.uploadImage} />
     
     </div>
    );
  }
}

