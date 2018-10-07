import React, { Component } from 'react';
import './App.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '30bef0d580a442ebbdbc9c5e71c7b89e'});
  // app.inputs.create([{
  //      "url": "https://i.ytimg.com/vi/J0EYT994eXg/maxresdefault.jpg",
  //      "concepts": [
  //      { "id": "blackhead", "value": false },
  //      { "id": "whitehead", "value": false },
  //      { "id": "pigmentation", "value": false },
  //      { "id": "acne", "value": false },
  //      { "id": "dark_eye", "value": false },
  //      { "id": "scaring", "value": false },
  //      { "id": "wart", "value": true }
  // ]}
  //     ]).then(
  //    createModel,
  //    errorHandler
  //  );

  // function createModel(inputs) {
  //   app.models.create('face', ["blackhead", "whitehead", "pigmentation", "acne", "dark_eye", "scaring", "wart"]).then(
  //     trainModel,
  //     errorHandler
  //   );
  // }

  // function trainModel(model) {
  //   model.train().then(
  //     predictModel,
  //     errorHandler
  //   );
  // }

  // function predictModel(model) {
  //   model.predict(['https://media.allure.com/photos/5ae38367b4825822d6ef7609/1:1/w_767/what-is-a-blackhead.jpg', 'http://www.howtoremovethat.com/wp-content/uploads/2013/06/whiteheads1.jpg']).then(
  //     function(response) {
  //       console.log(response);
  //     }, errorHandler
  //   );
  // }

  // function errorHandler(err) {
  //  console.error(err);
  // }

  // app.models.predict({id: 'face', version:'25dd13e01bb04d7bafb61212e5ead7ec'}, 'https://www.caffeinamagazine.it/wp-content/uploads/2016/12/vulva2.jpg').then(
  //   function(response) {
  //     console.log(response)
  //     console.log(response.outputs["0"].data.concepts["0"].id)
  //   },
  //   function(err) {
  //     console.log(err)
  //   }
  // );

class App extends Component {
  state ={
    img: "",
    flaw: "",
    blackhead: false,
    whitehead: false,
    pigmentation: false,
    acne: false,
    dark_eye: false,
    scaring: false
  }

base64_get = (f) =>{
  f.preventDefault();
  let reader = new FileReader();
  let file  = f.target.files[0];
  reader.onloadend = () => {
    this.handleImage(reader.result);
    this.setState({
      img: reader.result
    })
  }
  reader.readAsDataURL(file)
};

handleImage = (reader) => {
  const b64 = reader.split(',', 2)[1];
  console.log(b64)
  app.models.predict({id: 'face', version:'974fb0b3fbe6432db23486e390a33d9c'}, {base64: b64}).then(
    function(response) {
      console.log(response.outputs["0"].data.concepts["0"].id)
      this.setState({flaw: response.outputs["0"].data.concepts["0"].id})
      this.setState.flaw = true
     // this.setState.response.outputs["0"].data.concepts["0"].id = true;

    },
    function(err) {
      console.log(err)
    }
  );
}


  render() {
    return (
      <div className = "App">
        <div className = "Header">
          <h1>Title</h1>
        </div>
        <div className="adjust-image">
            <img className="real-img" src={this.state.img} alt=''/>
        </div>
        <div className="adjust-button">
          <label for="file-upload" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Upload Image
          </label>
          <input id="file-upload" type="file" onChange={(f) => this.base64_get(f)}/>
          {this.state.blackhead ? (
            <div>
              <button> hi there</button>
            </div>
          ): <div></div>}
        </div>
      </div>
    );
  }
}

export default App;
