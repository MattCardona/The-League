import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import FormFeilds from '../../ui/FormFeilds.js';

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
  submitForm(){

  }
  updateForm(element){
    console.log(element)
    const newFormData = {...this.state.formData};
    const newElement = {...newFormData[element.id]};

    newElement.value = element.event.target.value;
    newFormData[element.id] = newElement;
    this.setState(() => ({formData: newFormData}));
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
          </form>
        </div>
      </Fade>
    )
  }
};

export default  Enroll;