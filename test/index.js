var stathatWrapper = require('../'),
    stathat = require('stathat'),
    should = require('should'),
    sinon = require('sinon');

describe("Stathat Wrapper", function() {
  var sh = null
  beforeEach(function() {
    sinon.stub(stathat, 'trackEZCount')
    sinon.stub(stathat, 'trackEZValue')
  });
  afterEach(function() {
    stathat.trackEZCount.restore();
    stathat.trackEZValue.restore();
  });
  describe("with custom prefix", function() {
    beforeEach(function() {
      sh = stathatWrapper("key", {
        environment: "test",
        reporting: true,
        prefix: "stathat-wrapper",
        separator: ":"
      });
    });
    it("should count", function() {
      sh.count('tests passed', 1);

      stathat.trackEZCount.calledOnce.should.be.true;
      stathat.trackEZCount.calledWith("key", "stathat-wrapper:test:tests passed", 1);
    }); 
    it("should track a value", function() {
      sh.value('average test passes', 22.76);

      stathat.trackEZValue.calledOnce.should.be.true;
      stathat.trackEZValue.calledWith("key", "stathat-wrapper:test:average test passes", 22.76);
    });
  });
  describe("with default configuration", function() {
    beforeEach(function() {
      sh = stathatWrapper("key");
    });
    it("should count", function() {
      sh.count('tests passed', 1);

      stathat.trackEZCount.calledOnce.should.be.true;
      stathat.trackEZCount.calledWith("key", "development:tests passed", 1);
    }); 
    it("should track a value", function() {
      sh.value('average test passes', 22.76);

      stathat.trackEZValue.calledOnce.should.be.true;
      stathat.trackEZValue.calledWith("key", "development:average test passes", 22.76);
    }); 
  });
  describe("without reporting", function() {
    beforeEach(function() {
      sh = stathatWrapper("key", {
        reporting: false
      });
    });
    it("shouldn't report", function() {
      sh.count('tests passed', 1);
      sh.value('average test passes', 22.76);

      stathat.trackEZCount.called.should.be.false
      stathat.trackEZValue.called.should.be.false
    });
  });
  describe("without environment or prefix", function() {
    beforeEach(function() {
      sh = stathatWrapper("key", {
        environment: "",
        prefix: "",
      });
    });
    it("shouldn't use the separator", function() {
      sh.count('statistic!', 1);
      stathat.trackEZCount.calledWith("key", "statistic!", 1)
    });
  });
  describe("without a separator", function() {
    beforeEach(function() {
      sh = stathatWrapper("key", {
        separator: "",
        prefix: "prefix"
      });
    });
    it("should concatenate the values", function() {
      sh.count("statistics are fun", 1);
      stathat.trackEZCount.calledWith("key", "prefixdevelopmentstatistics are fun", 1);
    });
  });
});
