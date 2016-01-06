module.exports = function(app) {
  
  var c = app.controllers,
      m = app.middlewares,
      log = m.LogMiddleware;

  //controllers
  var logC = new c.log.LogsController(),
      home = new c.home.HomeController(),
      login =  new  c.login.LoginController(),
      act = new c.act.ActController(),
      user = new c.user.UserController();


  // To get all routes
  app.route('/rest/1/*')
    .get(log.before)
    .post(log.before);

  // Log routes
  app.route('/rest/1/logs')
    .get(logC.index)
    .post(logC.create);

  // Home routes
  app.route('/rest/1/home')
    .get(home.index);

  //login routes
  app.route('/rest/1/login')
      .post(login.login);

  // Acts routes
  app.route('/rest/1/acts')
    .get(act.index)
    .post(act.store);

  app.route('/rest/1/acts/:id')
    .put(act.evaluate);

  //user routes
  app.route('/rest/1/users')
      .get(user.index)
      .post(user.store);


};