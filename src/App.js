import React, { Component } from 'react';
import './App.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '30bef0d580a442ebbdbc9c5e71c7b89e'});

class App extends Component {
  state ={
    img: "",
    home: true,
    acnechart: false,
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
    (response) => {
      console.log(response.outputs["0"].data.concepts["0"].id)
      const key = response.outputs["0"].data.concepts["0"].id
      if (key === 'blackhead'){
        this.setState({ blackhead: true})
        this.setState({ whitehead: false})
        this.setState({ pigmentation: false})
        this.setState({ acne: false})
        this.setState({ dark_eye: false})
        this.setState({ scaring: false})
        this.setState({ home: false})
      }
      else if (key === 'whitehead'){
        this.setState({ whitehead: true})
        this.setState({ blackhead: false})
        this.setState({ pigmentation: false})
        this.setState({ acne: false})
        this.setState({ dark_eye: false})
        this.setState({ scaring: false})
        this.setState({ home: false})
      }
      else if (key === 'pigmentation'){
        this.setState({ pigmentation: true})
        this.setState({ blackhead: false})
        this.setState({ whitehead: false})
        this.setState({ acne: false})
        this.setState({ dark_eye: false})
        this.setState({ scaring: false})
        this.setState({ home: false})
      }
      else if (key === 'acne'){
        this.setState({ acne: true})
        this.setState({ blackhead: false})
        this.setState({ whitehead: false})
        this.setState({ pigmentation: false})
        this.setState({ dark_eye: false})
        this.setState({ scaring: false})
        this.setState({ home: false})
      }
      else if (key === 'dark_eye'){
        this.setState({ dark_eye: true})
        this.setState({ blackhead: false})
        this.setState({ whitehead: false})
        this.setState({ pigmentation: false})
        this.setState({ acne: false})
        this.setState({ scaring: false})
        this.setState({ home: false})
      }
      else if (key === 'scaring'){
        this.setState({ scaring: true})
        this.setState({ blackhead: false})
        this.setState({ whitehead: false})
        this.setState({ pigmentation: false})
        this.setState({ acne: false})
        this.setState({ dark_eye: false})
        this.setState({ home: false})
      }      
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
          <h1>SkinSthetic</h1>
        </div>
        <div className ="adjust.txt">
        {this.state.blackhead ? (
          <div>
            <h2> These are blackheads! </h2>
            <p>Blackheads are small bumps that appear on your skin due to clogged hair follicles.
            Blackheads form when a clog or plug develops in the opening of hair follicles in your skin.
            Each follicle contains one hair and a sebaceous gland that produces oil. It appears on the
            back, chest, neck, arms and shoulders.</p>
          </div>
        ): <div></div>}
        {this.state.whitehead ? (
          <div>
            <h2> These are whiteheads!</h2>
            <p> Whiteheads are a mild form of acne that appear as small, round, white bumps on the skin’s surface. 
            This type of acne occurs when a pore becomes clogged with sebum, dead skin cells, and debris.
            If this clogged pore is covered with a thin layer of skin, it appears white on its surface.
            Whiteheads commonly appear on the face, shoulders, neck, chest, and back.</p>
          </div>
        ): <div></div>}   
        {this.state.pigmentation ? (
          <div>
            <h2> These are pigmentations!</h2>
            <p> Skin pigmentations are uneven dark spots on the skin that is caused by sun exposure and UVA rays
            which penetrates deep into your skin and cause aging. 
            </p>
          </div>
        ): <div></div>}
        {this.state.acne ? (
          <div>
            <h2> This is acne!</h2>
            <p> Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells.
            It often causes whiteheads, blackheads or pimples, and usually appears on the face, forehead, chest, upper back and shoulders. 
            Acne is most common among teenagers, though it affects people of all ages. </p>    
            </div>
        ): <div></div>}   
        {this.state.acnechart ? (
          <div className = "adjust-image">

          </div>
        ): <div></div>}   
        
        {this.state.dark_eye ? (
          <div>
            <h2> These are dark circles!</h2>
            <p> Dark circles are caused by fatigue, age, eye strain, allegries, dehydration, sun overexposure, and genetics.
            They are often accompanied by eye bags, and they tend to make you look older than you look. </p>
          </div>
        ): <div></div>}   
        {this.state.scaring ? (
          <div>
            <h2> These are scars!</h2>
            <p>  A scar results from the biologic process of wound repair in the skin and other tissues. 
            Most wounds, except for very minor ones, result in some degree of scarring.
            Scars can result from accidents, diseases, skin conditions such as acne, or surgeries.</p>            
          </div>
        ): <div></div>} 
        </div>
        <div className="adjust-image">
            <img className="real-img" src={this.state.img} alt=''/>
        </div>
        {this.state.home ? (
        <div>
          <h3> Hello! Welcome to SkinSthetic! Our goal is to help you achieve healthier skin.
          Through analyzing your face, we will show you information about prevalent type of skin
          imperfection recognized by our program. To begin, please upload an image of your face!</h3> 
        </div>
        ): <div></div>}   
        <div className="adjust-button">
            <label for="file-upload" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i> Upload Image
          </label>
          <input id="file-upload" type="file" onChange={(f) => this.base64_get(f)}/>
        </div>                                             
      </div>
    );
  }
}

export default App;
