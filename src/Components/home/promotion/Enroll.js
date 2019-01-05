import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import FormFields from '../../ui/FormFields.js';
import { validate } from '../../ui/misc.js';
import { firebasePromotions } from '../../../firebase.js';

class Enroll extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.resetFormSuccess = this.resetFormSuccess.bind(this);
    this.successMessage = this.successMessage.bind(this);
    this.state = {
      formError: false,
      formSuccess: '',
      formData: {
        email: {
          element: 'input',
          value: '',
          config: {
            name: 'email',
            type: 'email',
            placeholder: "Enter Your Email"
          },
          validation: {
            required: true,
            email: true
          },
          valid: false,
          validationMessage: ''
        }
      }
    };
  }
  resetFormSuccess(bool){
    const newFormData = {...this.state.formData};
    for(let key in newFormData){
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }

    this.setState(() => ({
      formError: false,
      formData: newFormData,
      formSuccess: bool ? "Enrolled" : "User email already exist"
    }));
    this.successMessage();
  }
  successMessage(){
    setTimeout(() => {
      this.setState(() => ({
        formSuccess: ''
      }));
    }, 2100);
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
      firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value').then((snapshot) => {
        if(snapshot.val() === null){
          //if no matches add to db
          firebasePromotions.push(dataToSubmit);
          this.resetFormSuccess(true);
        }else{
          // if already user with email dont put in database
          this.resetFormSuccess(false);
        }
      })
      
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
  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(e) => this.submitForm(e)}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              <FormFields 
                id={'email'}
                formData={this.state.formData.email}
                change={(element) => this.updateForm(element)}
              />
            </div>
            {this.state.formError ? <div className="error_label">
              There is something wrong, try once more.
            </div> : null}
            <div className="success_label">{this.state.formSuccess}</div>
            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
            <div className="enroll_disclamer">
              Not all will win, please enter a email to reach you at.
            </div>
          </form>
        </div>
      </Fade>
    )
  }
};

export default  Enroll;