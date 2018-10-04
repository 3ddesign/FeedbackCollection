// shows users their from inputs for review
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confir your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}>Back
            </button>
            <button onClick={() => submitSurvey(formValues, history)}
                    className="green btn-flat right white-text ">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapSateToProps(state) {
    return {formValues: state.form.surveyForm.values};
}

export default connect(mapSateToProps, actions)(withRouter(SurveyFormReview));