const fs = require('fs');
const mkdir = (path) => {
  if (!fs.existsSync(path)){

  fs.mkdir(path,{ recursive: true }, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("New directory successfully created.")
  }
})
  }
}
function _copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
const copyfile  = (path,terget) =>{
  _copyFile(path,terget,(err) => console.log(err));
  console.log("copy success");
}
  




mkdir("../public");





console.log("hello")
console.log(__dirname)
