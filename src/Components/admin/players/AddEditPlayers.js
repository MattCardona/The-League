import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout.js';
import FormFields from '../../ui/FormFields.js';
import Fileuploader from '../../ui/FileUploader.js';
import { validate } from '../../ui/misc.js';
import { firebasePlayers, firebase, firebaseDB } from '../../../firebase.js';


class AddEditPlayers extends Component {
  constructor(props){
    super(props);
    this.updateForm = this.updateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetImage = this.resetImage.bind(this);
    this.storeFilename = this.storeFilename.bind(this);
    this.state = {
      playerId: '',
      formType: '',
      formError: false,
      formSuccess: '',
      defaultImg: '',
      formData: {
        name: {
          element: 'input',
          value: '',
          config: {
            label: 'Players Name',
            name: 'name_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        lastname: {
          element: 'input',
          value: '',
          config: {
            label: 'Players Last Name',
            name: 'lastname_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        number: {
          element: 'input',
          value: '',
          config: {
            label: 'Players Number',
            name: 'number_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        position: {
          element: 'select',
          value: '',
          config: {
            label: 'Select a position',
            name: 'select_position',
            type: 'select',
            options: [
              {key: "Keeper", value: "Keeper"},
              {key: "Defense", value: "Defense"},
              {key: "Midfield", value: "Midfield"},
              {key: "Striker", value: "Striker"},
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        image: {
          element: 'image',
          value: '',
          validation: {
            required: true
          },
          valid: true
        }
      }
    }
  }
  componentDidMount(){
    const playerId = this.props.match.params.id;
    if(!playerId){
      this.setState(() => ({
        formType: 'Add player'
      }))
    }else{
      // edit player
    }
  }
  submitForm(e){
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData){
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].value && formIsValid;
    }

    if(formIsValid){
      // submit form 
    }else{
      this.setState(() => ({
        formError: true
      }))
    }
  }
  updateForm(element){
    const newFormData = {...this.state.formData};
    const newElement = {...newFormData[element.id]};

    newElement.value = element.event.target.value;
    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[element.id] = newElement;
    // console.log(newFormData);
    this.setState(() => ({formData: newFormData, formError: false}));
  }
  resetImage(){}
  storeFilename(){}
  render() {
    return (
      <AdminLayout> 
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={(event) => this.submitForm(event)}>

              <Fileuploader
                dir="players"
                tag={"Player image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={() => this.resetImage()}
                filename={(filename) => this.storeFilename(filename)}
              />

              <FormFields 
                id={'name'}
                formData={this.state.formData.name}
                change={(element) => this.updateForm(element)}
              />
              <FormFields 
                id={'lastname'}
                formData={this.state.formData.lastname}
                change={(element) => this.updateForm(element)}
              />
              <FormFields 
                id={'number'}
                formData={this.state.formData.number}
                change={(element) => this.updateForm(element)}
              />
              <FormFields 
                id={'position'}
                formData={this.state.formData.position}
                change={(element) => this.updateForm(element)}
              />

              <div className="sucess_label">
                {this.state.formSuccess}
              </div>
              {this.state.formError ?
                <div className="error_label">
                  Something is incorrect
                </div>
                : ''
              }
              <div className="admin_submit">
                <button
                  onClick={(event) => this.submitForm(event)}
                >
                  {this.state.formType}
                </button>
              </div>

            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
};

export default AddEditPlayers;