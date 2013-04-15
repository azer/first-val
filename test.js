var firstval = require("./");

it('returns a new function that tries given fns in order', function(done){

  var comp1 = firstval(foo, bar, qux),
      comp2 = firstval(corge, bar, foo, qux);

  comp1(3.14, function(error, result){
    expect(error).to.not.exist;
    expect(result.bar).to.equal(3.14);

    comp2(1.56, function(error, result){
      expect(error).to.not.exist;
      expect(result.corge).to.equal(1.56);
      done();
    });

  });

});

function foo(_, cb){
  cb();
}

function bar(input, cb){
  cb(undefined, { bar: input });
}

function qux(_, cb){
  throw new Error('qux shouldnt be called');
  cb();
}

function corge(input, cb){
  cb(undefined, { corge: input });
}
