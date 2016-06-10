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
