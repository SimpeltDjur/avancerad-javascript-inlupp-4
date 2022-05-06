import { useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { StyledColumnDiv } from "../styledcomponents/StyledColumnDiv";
import { StyledRowDiv } from "../styledcomponents/styledRowDiv";
import { StyledSoloImg } from "../styledcomponents/StyledSoloImg";

export function Solo() {
  let id = parseInt(useParams().id || "-1");
  const [animal, setAnimal] = useState<IAnimal>(
    JSON.parse(localStorage.getItem("animals") || "[]")[id]
  );

  function feed() {
    setAnimal({ ...animal, lastFed: Date() });
    let animals = JSON.parse(localStorage.getItem("animals") || "[]");
    animals[id] = { ...animal, lastFed: Date() };
    localStorage.setItem("animals", JSON.stringify(animals));
    console.log(JSON.parse(localStorage.getItem("animals") || "[]"));
  }

  let hungryTag = <></>;
  if (Date.parse(Date()) - Date.parse(animal.lastFed) > 14400000) {
    hungryTag = <div>HUNGRIG!!</div>;
  } else {
    hungryTag = (
      <div>
        {animal.name} fick senast mat: {animal.lastFed}
      </div>
    );
  }
  let feedButton = <></>;
  if (Date.parse(Date()) - Date.parse(animal.lastFed) > 10800000) {
    feedButton = <button onClick={feed}>Mata Djur</button>;
  } else {
    feedButton = <></>;
  }

  return (
    <>
      <StyledColumnDiv>
        <StyledSoloImg src={animal.imageUrl} alt={animal.name}></StyledSoloImg>
        <StyledRowDiv>
          {" "}
          {hungryTag} {feedButton}{" "}
        </StyledRowDiv>
        <p>{animal.longDescription}</p>
      </StyledColumnDiv>
    </>
  );
}
