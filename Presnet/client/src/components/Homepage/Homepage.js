import React from "react";
import homepage from "../../Images/homepage.png";

const Homepage = () => {

  return (
    <>
      <div className="homepage1">
         <h1>Track Birthdays.</h1>
         <h1>Make a Wish List.</h1>
         <h1>Give Thoughtful Gifts.</h1>
      </div>
      <div>
        <div>
        <img className="homepageImage" src={homepage} />
        </div>
        <div className="homepage2">
        <h1>Upcoming Events</h1>
        </div>
      </div>
    </>
  );
}

export default Homepage;