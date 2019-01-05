import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout.js';
import FormFields from '../../ui/FormFields.js';
import { validate } from '../../ui/misc.js';

class AddEditMatch extends Component {
  constructor(props){
    super(props);
    this.state = {
      matchId: '',
      formType: '',
      formError: false,
      formSuccess: '',
      teams: [],
      formData: {
        date: {
          element: 'input',
          value: '',
          config: {
            label: 'Event date',
            name: 'date_input',
            type: 'date'
          },
          validation: {
            required: true,
            email: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        }
      }
    }
  }
  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>
            { this.state.formType }
          </h2>
          <div>
            <form onSubmit={(event) => this.submitForm(event)}>
              <FormFields 
                id={'date'}
                formData={this.state.formData.date}
                change={(element) => this.updateForm(element)}
              />
            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
};

export default AddEditMatch;