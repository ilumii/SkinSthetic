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
            <p>
              <a
                href="https://www.amazon.com/St-Ives-Blackhead-Clearing-Scrub/dp/B00M8G8WKY?keywords=blackhead%2Bcleanser&qid=1538923028&sr=8-5&ref=sr_1_5&th=1"
                target="_blank"
                rel="noopener noreferrer"
              >
              St. Ives Blackhead Clearing Face Scrub, Green Tea
              </a>
              <br></br>
              <a
               href="https://www.amazon.com/Charcoal-Blackhead-Cleansing-Anti-Aging-Reduction/dp/B07C9G9FCZ?crid=HXFEPTFMYFWX&keywords=blackhead+charcoal+peel+off+mask&qid=1538922940&sprefix=blackhead+charc%2Caps%2C232&sr=8-5&ref=sr_1_5"
              target="_blank"
              rel="noopener noreferrer"
              >
              Black Peel off Mask,Charcoal Blackhead Remover Mask
              </a>
            </p>
          </div>
        ): <div></div>}
        {this.state.whitehead ? (
          <div>
            <h2> These are whiteheads!</h2>
            <p> Whiteheads are a mild form of acne that appear as small, round, white bumps on the skin’s surface. 
            This type of acne occurs when a pore becomes clogged with sebum, dead skin cells, and debris.
            If this clogged pore is covered with a thin layer of skin, it appears white on its surface.
            Whiteheads commonly appear on the face, shoulders, neck, chest, and back. </p>
            <p>
              <a
                href="https://www.amazon.com/Vitamin-Facial-Cleanser-Ingredients-InstaNatural/dp/B00VMYKCL0?keywords=cleanser&qid=1538922851&sr=8-5&ref=sr_1_5"
                target="_blank"
                rel="noopener noreferrer"
              >
              Vitamin C Facial Cleanser
              </a>
              <br></br>
              <a
               href="https://www.amazon.com/Benzoyl-Peroxide-Acne-Treatment-Wash/dp/B00PO7GKLM?crid=2C6XQ5X978Q7F&keywords=benzoyl+peroxide&qid=1538923208&sprefix=benzoyl+%2Caps%2C176&sr=8-5&ref=sr_1_5"
              target="_blank"
              rel="noopener noreferrer"
              >
              Humane Benzoyl Peroxide 10% Acne Treatment Body & Face Wash
              </a>
            </p>
          </div>
        ): <div></div>}   
        {this.state.pigmentation ? (
          <div>
            <h2> These are pigmentations!</h2>
            <p> Skin pigmentations are uneven dark spots on the skin that is caused by sun exposure and UVA rays
            which penetrates deep into your skin and cause aging. </p>
            <p>
              <a
                href="https://www.amazon.com/MIZON-Snail-Repair-Cream-Grams/dp/B00AF63QQE?keywords=snail+cream&qid=1538923109&sr=8-5&ref=sr_1_5"
                target="_blank"
                rel="noopener noreferrer"
              >
              MIZON All In One Snail Repair Cream
              </a>
              <br></br>
              <a
               href="https://www.amazon.com/Individually-Packaged-Hydrogel-Secretion-Moisturizing/dp/B01KLOS5KQ?keywords=snail+mask&qid=1538923274&sr=8-5&ref=sr_1_5"
              target="_blank"
              rel="noopener noreferrer"
              >
              SKEDERM Snail Jelly Face Mask
              </a>
            </p>
          </div>
        ): <div></div>}
        {this.state.acne ? (
          <div>
            <h2> This is acne!</h2>
            <p> Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells.
            It often causes whiteheads, blackheads or pimples, and usually appears on the face, forehead, chest, upper back and shoulders. 
            Acne is most common among teenagers, though it affects people of all ages. </p>
            <p>
              <a
                href="https://www.amazon.com/Neutrogena-Oil-Free-Grapefruit-Salicylic-Eliminate/dp/B0038ZZV44?crid=1L3NG83G6VXI6&keywords=neutrogena+oilfree+acne+wash&qid=1538923340&sprefix=acne+oilfree%2Caps%2C190&sr=8-5&ref=sr_1_5"
                target="_blank"
                rel="noopener noreferrer"
              >
              Neutrogena Oil-Free Acne Wash Pink Grapefruit Cream Facial Cleanser
              </a>
              <br></br>
              <a
               href="https://www.amazon.com/COSRX-Ultra-Moisturizing-Lotion-Birch/dp/B01CLTKI4A?keywords=oil+free+moisturizer+korean&qid=1538923462&sr=8-5&ref=sr_1_5"
              target="_blank"
              rel="noopener noreferrer"
              >
              COSRX Oil Free Ultra Moisturizing Lotion with Birch Sap
              </a>
            </p>    
            </div>
        ): <div></div>} 
        {this.state.dark_eye ? (
          <div>
            <h2> These are dark circles!</h2>
            <p> Dark circles are caused by fatigue, age, eye strain, allegries, dehydration, sun overexposure, and genetics.
            They are often accompanied by eye bags, and they tend to make you look older than you look. </p>
            <p>
              <a
                href="https://www.amazon.com/Baebody-Appearance-Circles-Puffiness-Wrinkles/dp/B01K2UMMI0?crid=3VMHVFKB41SHM&keywords=dark+circles+under+eye+treatment&qid=1538923530&sprefix=dark+circl%2Caps%2C-1&sr=8-5&ref=sr_1_5"
                target="_blank"
                rel="noopener noreferrer"
              >
              Baebody Eye Gel for Appearance of Dark Circles, Puffiness, Wrinkles and Bags
              </a>
              <br></br>
              <a
               href="https://www.amazon.com/Collagen-Purederm-Anti-aging-Properties-Puffiness/dp/B00CTQ0EUY?crid=3VMHVFKB41SHM&keywords=dark+circles+under+eye+treatment&qid=1538923590&sprefix=dark+circl%2Caps%2C-1&sr=8-7&ref=sr_1_7"
              target="_blank"
              rel="noopener noreferrer"
              >
              Deluxe Collagen Eye Mask Collagen Pads For Women By Purederm
              </a>
            </p>    
          </div>
        ): <div></div>}   
        {this.state.scaring ? (
          <div>
            <h2> These are scars!</h2>
            <p>  A scar results from the biologic process of wound repair in the skin and other tissues. 
            Most wounds, except for very minor ones, result in some degree of scarring.
            Scars can result from accidents, diseases, skin conditions such as acne, or surgeries.</p>
            <p>
              <a
                href="https://www.amazon.com/Best-Scar-Cream-Face-Treatment/dp/B01M3Y1ZLT?crid=3PBPK16AZ2NH&keywords=acne+scar+remover+cream&qid=1538923664&sprefix=acne+scar+%2Caps%2C168&sr=8-5&ref=sr_1_5"
                target="_blank"
                rel="noopener noreferrer"
              >
              Best Scar Cream for Face - Vitamin E Oil for Skin After Surgery
              </a>
              <br></br>
              <a
               href="https://www.amazon.com/Mederma-Advanced-Scar-Gel-Recommended/dp/B001PQBEAI?crid=3PBPK16AZ2NH&keywords=acne+scar+remover+cream&qid=1538923728&sprefix=acne+scar+%2Caps%2C168&sr=8-7&ref=sr_1_7"
              target="_blank"
              rel="noopener noreferrer"
              >
              Mederma Advanced Scar Gel 
              </a>
            </p>                
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
