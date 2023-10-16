const request = require("supertest");
const app = require("../server.js"); 

describe("Server API tests", () => {
  it("should return a welcome message for the root route", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .expect({ message: "Server is running on port" }) 
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should return 404 for an invalid route", (done) => {
    request(app)
      .get("/invalid-route")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  
  it("should test your user routes", (done) => {
    request(app)
      .get("/users") 
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

 
});


