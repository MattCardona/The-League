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
        },
        away: {
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
        resultAway: {
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
        },
        referee: {
          element: 'input',
          value: '',
          config: {
            label: 'Referee',
            name: 'referee_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        stadium: {
          element: 'input',
          value: '',
          config: {
            label: 'Stadium',
            name: 'stadium_input',
            type: 'text'
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        result: {
          element: 'select',
          value: '',
          config: {
            label: 'Team result',
            name: 'select_result',
            type: 'select',
            options: [
              {key: 'W', value: 'W'},
              {key: 'L', value: 'L'},
              {key: 'D', value: 'D'},
              {key: 'n/a', value: 'n/a'},
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validationMessage: '',
          showlabel: true
        },
        final: {
          element: 'select',
          value: '',
          config: {
            label: 'Game played',
            name: 'select_played',
            type: 'select',
            options: [
              {key: 'Yes', value: 'Yes'},
              {key: 'No', value: 'No'}
            ]
          },
          validation: {
            required: true
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

              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormFields 
                      id={'away'}
                      formData={this.state.formData.away}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormFields 
                      id={'resultAway'}
                      formData={this.state.formData.resultAway}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="split_fields">
                <FormFields 
                  id={'referee'}
                  formData={this.state.formData.referee}
                  change={(element) => this.updateForm(element)}
                />
                <FormFields 
                  id={'stadium'}
                  formData={this.state.formData.stadium}
                  change={(element) => this.updateForm(element)}
                />
              </div>

              <div className="split_fields">
                <FormFields 
                  id={'result'}
                  formData={this.state.formData.result}
                  change={(element) => this.updateForm(element)}
                />
                <FormFields 
                  id={'final'}
                  formData={this.state.formData.final}
                  change={(element) => this.updateForm(element)}
                />
              </div>

            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
};

export default AddEditMatch;