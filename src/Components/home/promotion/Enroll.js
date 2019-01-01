import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import FormFeilds from '../../ui/FormFeilds.js';
import { validate } from '../../ui/misc.js';

class Enroll extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
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
  submitForm(e){
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData){
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].value && formIsValid;
    }

    if(formIsValid){
      console.log(dataToSubmit);
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
              <FormFeilds 
                id={'email'}
                formData={this.state.formData.email}
                change={(element) => this.updateForm(element)}
              />
            </div>
            {this.state.formError ? <div className="error_label">
              There is something wrong, try once more.
            </div> : null}
            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
          </form>
        </div>
      </Fade>
    )
  }
};

export default  Enroll;