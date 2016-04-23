'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var clubCtrlStub = {
  index: 'clubCtrl.index',
  show: 'clubCtrl.show',
  create: 'clubCtrl.create',
  update: 'clubCtrl.update',
  destroy: 'clubCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var clubIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './club.controller': clubCtrlStub
});

describe('Club API Router:', function() {

  it('should return an express router instance', function() {
    expect(clubIndex).to.equal(routerStub);
  });

  describe('GET /yes', function() {

    it('should route to club.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'clubCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /yes/:id', function() {

    it('should route to club.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'clubCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /yes', function() {

    it('should route to club.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'clubCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /yes/:id', function() {

    it('should route to club.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'clubCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /yes/:id', function() {

    it('should route to club.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'clubCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /yes/:id', function() {

    it('should route to club.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'clubCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
