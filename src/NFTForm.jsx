import React, { useState } from "react";
import { NFT } from "./pages/Minting";
import { Card, CardHeader, ImageHeader, CardBody } from "react-simple-card";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function NFTForm(props) {
  var address = "bhaiya";
  let history = useHistory();
  const [property, setProperty] = useState("");
  const [gameValue, setGameValue] = useState("");
  function hashIt(password) {
    let arr = password.toString().split("");
    return arr.reduce(
      (hashCode, currentVal) =>
        (hashCode =
          currentVal.charCodeAt(0) +
          (hashCode << 6) +
          (hashCode << 16) -
          hashCode),
      0
    );
  }

  function mintNFT(value) {
    var speed = Math.floor(Math.random() * 10);
    var xp = Math.floor(Math.random() * 10);
    var power = Math.floor(Math.random() * 10);
    var hashValue = hashIt(speed + xp + power);
    localStorage.setItem(
      address,
      JSON.stringify(
        new NFT(
          props.data.iq,
          props.data.name,
          props.data.description,
          xp,
          speed,
          power,
          hashValue
        )
      )
    );
  }

  function createGame(props, property, gameValue) {
    console.log(localStorage.getItem("bhaiya"));
    console.log(property, gameValue);
    alert("Game Created");
    history.push("/");

  }

  return (
    <Card>
      <CardHeader className="headline">{props.data.name}</CardHeader>
      <ImageHeader
        className="imageProp"
        imageSrc={props.data.imageUri}
      ></ImageHeader>
      <CardBody>Description:- {props.data.description}</CardBody>
      {!props.data.mynft ? (
        <button onClick={() => mintNFT(props)}>Mint</button>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <td>Enter the property</td>
                <td>
                  <input
                    type="text"
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Creator Attribute Value</td>
                <td>
                  <input
                    type="text"
                    value={gameValue}
                    onChange={(e) => setGameValue(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => createGame(props, property, gameValue)}>
            Create Game
          </button>
        </>
      )}
    </Card>
  );
}
