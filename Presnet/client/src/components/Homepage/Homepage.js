import React from "react";
import homepage from "../../Images/homepage.png";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./Home.css";
import UpcomingEventList from "../Events/UpcomingEventList";

const Homepage = () => {

  return (
    <>
      <Container >
      <Row className="homepage1 justify-content-center" xs lg = "12">
         <h1>Track Birthdays.</h1>
         <h1>Make a Wish List.</h1>
         <h1>Give Thoughtful Gifts.</h1>
      </Row>
      <Row className="homepage2">
      <Col xs lg="4">
        <div className="homepageImageBox">
        <img className="homepageImage" src={homepage} />
        </div>
        </Col>
        <Col xs lg="8">
        <div className="homepage2">
        <h1>Upcoming Events</h1>
        <div>
          <UpcomingEventList />
        </div>
        </div>
      </Col>
      </Row>
      <Row>
      <div className="homepage3">
            <h1>Never forget a Birthday again.</h1>
            <p>Add a friend and keep track of all your loved ones upcoming special events and celebrations. Build out your network today! </p>
            <div className="buttonBox">
            <Link to={`/friends`}>
                    <button className="button" >Add a Friend</button>
                </Link>
           </div>
      </div>
      </Row>
      <Row>
      <div className="homepage4">
            <h1>Have a reason to celebrate?</h1>
            <p>Create a wish list to make shopping a breeze for your loved ones and get what you want - a double win! </p>
            <div className="buttonBox">
            <Link to={`/wishList`}>
                    <button className="button" >Make a Wish List</button>
                </Link>
           </div>
      </div>
      </Row>
      </Container>
    </>
  );
}

export default Homepage;