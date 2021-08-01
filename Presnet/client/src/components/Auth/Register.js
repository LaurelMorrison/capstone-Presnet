import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../../modules/authManager";
import { GetAllColors } from "../../modules/favoriteColorManager";
import { GetAllSizes } from "../../modules/clothingSizeManager";


export default function Register() {
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [age, setAge] = useState();
  const [clothingSizeId, setclothingSizeId] = useState();
  const [favoriteColorId, setfavoriteColorId] = useState();
  const [shoeSize, setShoeSize] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [favoriteColor, setFavoriteColors] = useState([]);
  const [clothingSize, setClothingSize] = useState([]);

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, email, address, age, favoriteColorId, clothingSizeId, shoeSize };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };

  const getFavoriteColors = () => {
    return GetAllColors()
    .then(colorsFromAPI => {
        setFavoriteColors(colorsFromAPI)
    })
  }   

  const getClothingSizes = () => {
    return GetAllSizes()
    .then(sizesFromAPI => {
        setClothingSize(sizesFromAPI)
     })
  }   

  useEffect(() => {
    getClothingSizes();
    getFavoriteColors();
}, []) 

  return (
    <Form onSubmit={registerClick} className="registerForm">
      <div className="loginHeader">
        <h1>Register an Account</h1>
        <p>We are all about personal touches, so let us know a bit about you!</p>
      </div>
      <fieldset>
        <FormGroup className="loginBox">
          <Label htmlFor="firstName">First Name:</Label>
          <Input id="firstName" type="text" autoFocus onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
        <Label htmlFor="lastName">Last Name:</Label>
          <Input id="lastName" type="text" autoFocus onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
          <Label for="email">Email:</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
          <Label for="password">Password:</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
          <Label for="confirmPassword">Confirm Password:</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox"> 
        <Label htmlFor="address">Address:</Label>
          <Input id="adress" type="text" autoFocus onChange={e => setAddress(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
          <Label for="age">Age:</Label>
          <Input id="age" type="text" onChange={e => setAge(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
          <Label for="shoeSize">Shoe Size:</Label>
          <Input id="shoeSize" type="text" onChange={e => setShoeSize(e.target.value)} />
        </FormGroup>
        <FormGroup className="loginBox">
        <Label for="clothingSizeId">Select your clothing size:</Label>
             <Input
                type="select"
                value={clothingSizeId}
                name="clothingSizeId"
                id="clothingSizeId"
                onChange={e => setclothingSizeId(e.target.value)}
                >
                <option value="0">Select your clothing size</option>
                  {clothingSize.map((c) => (
                    <option key={c.id} value={c.id}>
                    {c.size}
                    </option>
                  ))}
              </Input>
        </FormGroup>  
        <FormGroup className="loginBox">
        <Label for="favoriteColorId">Pick your favorite color:</Label>
             <Input
                type="select"
                value={favoriteColorId}
                name="favoriteColorId"
                id="favoriteColorId"
                onChange={e => setfavoriteColorId(e.target.value)}
                >
                <option value="0">Select your favorite color</option>
                  {favoriteColor.map((f) => (
                    <option key={f.id} value={f.id}>
                    {f.color}
                    </option>
                  ))}
              </Input>
        </FormGroup>         
        <FormGroup>
          <div className="buttonBox">
           <Button className="button">Register</Button>
          </div>
        </FormGroup>
      </fieldset>
    </Form>
  );
}