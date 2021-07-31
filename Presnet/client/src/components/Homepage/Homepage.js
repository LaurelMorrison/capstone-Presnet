import React from "react";
import homepage from "../../Images/homepage.png";
import { Link } from "react-router-dom";

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
        <h1>Your Events</h1>
        </div>
        <div>
            <h1>Have a reason to celebrate?</h1>
            <p>Create a wish list to make shopping a breeze for your loved ones and get what you want - a double win! </p>
            <Link to={`/wishList`}>
                    <button className="btn btn-secondary" >Make a Wish List</button>
                </Link>
        </div>
      </div>
    </>
  );
}

export default Homepage;