FlowRouter.route('/', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'home'
      });
  }
});

FlowRouter.route('/createUser', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'createUser'
      });
  }
});

FlowRouter.route('/authorizeUser', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'authorizeUser'
      });
  }
});

FlowRouter.route('/createDoctor', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'createDoctor'
      });
  }
});

FlowRouter.route('/registerPatient', {
  action(){
      BlazeLayout.render('mainLayout', {
        content: 'registerPatient'
      });
  }
});

FlowRouter.route('/createClinic', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createClinic'
    });
  }
});

FlowRouter.route('/createDoctorType', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createDoctorType'
    });
  }
});

FlowRouter.route('/createRole', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createRole'
    });
  }
});

FlowRouter.route('/appointment/:patientId/:eventId/:doctorId', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'appointment'
    });
  }
});

FlowRouter.route('/createTreatment', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createTreatment'
    });
  }
});

FlowRouter.route('/createDiagnosis', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createDiagnosis'
    });
  }
});

FlowRouter.route('/createSymptom', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createSymptom'
    });
  }
});

FlowRouter.route('/patientHistory/:patientId', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'patientHistory'
    });
  }
});

FlowRouter.route('/createToothStatus', {
  action(){
    BlazeLayout.render('mainLayout', {
      content: 'createToothStatus'
    });
  }
});
