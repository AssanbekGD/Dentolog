import './patientHistory.html';
import {Template} from 'meteor/templating';
import {Patients} from '../../../api/patients.js';
import {Appointments} from '../../../api/appointments.js';
import {Symptoms} from '../../../api/symptoms.js';
import {Diagnoses} from '../../../api/diagnoses.js';
import {Treatments} from '../../../api/treatments.js';
import {Doctors} from '../../../api/doctors.js';

Template.patientHistory.onRendered(function patientHistoryOnRendered(){
  Session.set('patientId', FlowRouter.getParam('patientId'));
  Meteor.subscribe('patients');
  Meteor.subscribe('appointments', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      $('.collapse').collapse();
    }
  });
  Meteor.subscribe('symptoms');
  Meteor.subscribe('diagnoses');
  Meteor.subscribe('treatments');
  Meteor.subscribe('doctors');
});

Template.patientHistory.helpers({
  patientId()
  {
    return FlowRouter.getParam('patientId');
  },
  patientName()
  {
    const currPatient = Patients.findOne({_id: Session.get('patientId')});

    return `${currPatient.name} ${currPatient.surname}`;
  },
  appointments()
  {
    const appointmentsCursor = Appointments.find({patientId: Session.get('patientId')});
    console.log(appointmentsCursor);
    return appointmentsCursor;
  },
  getSymptomName(_id)
  {
    return Symptoms.findOne({_id}).name;
  },
  getDiagnosisName(_id)
  {
    return Diagnoses.findOne({_id}).name;
  },
  getTreatmentName(_id)
  {
    return Treatments.findOne({_id}).name;
  },
  getDoctorName(_id)
  {
    const doctor = Doctors.findOne({_id});
    return `${doctor.name} ${doctor.surname}`;
  },
  getAppointmentDuration(start, end)
  {
    const startTime = moment(start),
          endTime = moment(end);

    return beautifyMilliseconds(endTime.diff(startTime));
  },
  isEven(index)
  {
    return index % 2;
  }
});

function beautifyMilliseconds(ms)
{
  const hours = parseInt(ms / 3600000),
        tempms = ms % 3600000,
        minutes = parseInt(tempms / 60000);

  return `${hours} часов, ${minutes} минут`;
}
