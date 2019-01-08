import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout.js';
import FormFields from '../../ui/FormFields.js';
import { validate } from '../../ui/misc.js';
import { fireMatches, firebaseTeams, firebaseDB } from '../../../firebase.js'

import { firebaseLooper } from '../../ui/misc.js';  

class AddEditMatch extends Component {
  constructor(props){
    super(props);
    this.updateFields = this.updateFields.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.successForm = this.successForm.bind(this);
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
  componentDidMount(){
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once('value').then((snapshot) => {
        const teams = firebaseLooper(snapshot);
        const teamOptions = [];

        snapshot.forEach((childSnapshot) => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          })
        });
        
        this.updateFields(match, teamOptions, teams, type, matchId);
      })
    };

    if(!matchId){
      getTeams(false, "Add Match")
    }else{
      firebaseDB.ref(`matches/${matchId}`).once('value').then((snapshot) => {
        const match = snapshot.val();
        getTeams(match, "Edit Match");
      })
    }
  }
  successForm(message){
    this.setState(() => ({formSuccess: message}));
    setTimeout(() => {
      this.setState(() => ({formSuccess: ''}));
    }, 2200)
  }
  submitForm(e){
    e.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData){
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].value && formIsValid;
    }

    this.state.teams.forEach((team) => {
      if(team.shortName === dataToSubmit.local){
        dataToSubmit['localThmb'] = team.thmb;
      }
      if(team.shortName === dataToSubmit.away){
        dataToSubmit['awayThmb'] = team.thmb;
      }
    })

    if(formIsValid){
      if(this.state.formType === 'Edit Match'){
        firebaseDB.ref(`matches/${this.state.matchId}`).update(dataToSubmit).then(() => {
          this.successForm('Update completed')
        }).catch((err) => {
          this.setState(() => ({
            formError: true
          }))
        })
      }else{
        fireMatches.push(dataToSubmit).then(() => {
          this.props.history.push('/admin_matches')
        }).catch((err) => {
          this.setState(() => ({ 
            formError: err
          }));
        })
      }
    }else{
      this.setState(() => ({
        formError: true
      }))
    }
  }
  updateFields(match, teamOptions, teams, type, matchId){
    const newFormData = {
      ...this.state.formData
    }

    for(let key in newFormData){
      if(match){
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if(key === 'local' || key === 'away'){
        newFormData[key].config.options = teamOptions;
      }
    }
    this.setState(() => ({
      matchId,
      formType: type,
      formData: newFormData,
      teams
      })
    )
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

export default AddEditMatch;