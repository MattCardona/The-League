import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import FormFeilds from '../../ui/FormFeilds.js';

class Enroll extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
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
              />
            </div>
          </form>
        </div>
      </Fade>
    )
  }
};

export default  Enroll;