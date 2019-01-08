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
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        local: {
          element: 'select',
          value: '',
          config: {
            label: 'Select local team',
            name: 'select_local',
            type: 'select',
            options: []
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: false
        },
        resultLocal: {
          element: 'input',
          value: '',
          config: {
            label: 'Result local',
            name: 'result_local_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: false
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

              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormFields 
                      id={'local'}
                      formData={this.state.formData.local}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormFields 
                      id={'resultLocal'}
                      formData={this.state.formData.resultLocal}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
};

export default AddEditMatch;