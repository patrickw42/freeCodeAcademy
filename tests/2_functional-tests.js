const chai = require("chai");
const assert = chai.assert;

//will hold our express() app exported from /server
const server = require("../server");

//will give chai access to all chai-http methods
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

//call Zombie can pass link to our running app to it.
const Browser = require("zombie");
Browser.site = "https://freecodeacademy.herokuapp.com";

suite("Functional Tests with Zombie.js", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        //will cause chai to open express app/accessing server
        .request(server)
        //will run a app.GET('/hello' ()=>{})
        .get("/hello")
        //when GET call finished will confirm res.object is correct using assert
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          //NEED done() call at end since async
          done();
        });
    });
    // #2 use chia to request access to our express app (server) place a get request to /hello with param name passed as 'Pat. Use assert.equal to make sure request response.text is what we expect it to be 'hello Pat' since name = Pat in request
    test("GET /hello with your name", function (done) {
      chai
        //server is our express app()
        .request(server)
        .get("/hello?name=Pat")
        .end(function (err, res) {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.text, "hello Pat", 'Response should be "hello Pat"');
          //need to call done() at end since async operation
          done();
        });
    });

    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        //server.js includes express app and travellers array
        .request(server)
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200, "Status should be 200");
          assert.equal(
            res.type,
            "application/json",
            "Type should be Application/JSON"
          );
          assert.equal(
            res.body.name,
            "Cristoforo",
            "Name should be Cristoforo"
          );
          assert.equal(
            res.body.surname,
            "Colombo",
            "Surname should be Colombo"
          );
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200, "Status should be 200");
          assert.equal(
            res.type,
            "application/json",
            "Type should be 'applicaiton/json' "
          );
          assert.equal(res.body.name, "Giovanni", "Name should be 'Giovanni' ");
          assert.equal(
            res.body.surname,
            "da Verrazzano",
            "Surname should be 'da Verrazzano' "
          );
          done();
        });
    });
  });

  const Browser = require("zombie");
  Browser.site("https://freecodeacademy.herokuapp.com/");

  suite("Functional tests with Zombie.js", function () {
    // this.timeout(5000);
    const browser = new Browser();
    suiteSetup(function (done) {
      return browser.visit("/", done);
    });

    suite("Headless browser", function () {
      test('should have a working "site" property', function () {
        assert.isNotNull(browser.site);
      });
    });

    suite('"Famous Italian Explorers" form', function () {
      // #5         // replaced "in the HTML form"
      //               with     " - write your e2e test..."
      test('Submit the surname "Colombo" - write your e2e test', function (done) {
        //autofills browser form surname to Colombo
        // then() is needed because fill is async It then triggers form submission which is also async so it needs a callback which checks the <div> where id=name id = surname and id = date (based on form) to make sure correct values entered for Colombo
        //NOTICE USES assert.text() and .elements() based on what it is matching
        browser.fill("surname", "Colombo");
        browser.pressButton("submit", function () {
          browser.assert.success();
          browser.assert.text("span#name", "Cristoforo");
          browser.assert.text("span#surname", "Colombo");
          browser.assert.elements("span#dates", 1);
          done();
        });

        this.timeout(5000);
      });
      // #6
      test('Submit the surname "Vespucci" in the HTML form', function (done) {
        assert.fail();

        done();
      });
    });
  });
});
