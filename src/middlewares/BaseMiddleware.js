"use strict";

module.exports = function(app) {

  class BaseMiddleware {
    before() {};
    after() {};
  }

  return BaseMiddleware;

}