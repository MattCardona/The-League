import React, { Component } from 'react';
import FormFeilds from '../ui/FormFeilds.js';
import { firebase } from '../../firebase.js';
import { validate } from '../ui/misc.js';


class SignIn extends Component {
  constructor(props){
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
        },
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password',
            type: 'password',
            placeholder: "Enter Password"
          },
          validation: {
            required: true
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
      firebase.auth().signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password).then(() => {
        this.props.history.push("/dashboard");
      }).catch((err) => {
        this.setState(() => ({ formError: true}));
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
      <div className="container">
        <div className="signin_wrapper" style={{margin: '100px'}}>
          <form onSubmit={(e) => this.submitForm(e)}>
            <h2>Login</h2>
            <FormFeilds 
                id={'email'}
                formData={this.state.formData.email}
                change={(element) => this.updateForm(element)}
              />
            <FormFeilds 
                id={'password'}
                formData={this.state.formData.password}
                change={(element) => this.updateForm(element)}
              />
              {this.state.formError ? <div className="error_label">
                There is something wrong, try once more.
              </div> : null}
              <button onClick={(event) => this.submitForm(event)}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn;