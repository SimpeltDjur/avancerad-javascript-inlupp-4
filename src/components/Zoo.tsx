import { useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { StyledGalleryDiv } from "../styledcomponents/StyledGalleryDiv";
import { StyledTumbnail } from "../styledcomponents/StyledTumbnail";

export function Zoo() {
  let animals: IAnimal[] = JSON.parse(localStorage.getItem("animals") || "[]");

  let animalTags = animals.map((animal) => {
    let hungryTag = <></>;
    if (Date.parse(Date()) - Date.parse(animal.lastFed) > 14400000) {
      hungryTag = <div>HUNGRIG!!</div>;
    } else {
      hungryTag = <></>;
    }
    return (
      <>
        <Link to={"/animal/" + (animal.id - 1)}>
          <h5>{animal.name}</h5>
          <StyledTumbnail
            src={animal.imageUrl}
            alt={animal.name}
          ></StyledTumbnail>
          {hungryTag}
        </Link>
        <p>{animal.shortDescription}</p>{" "}
      </>
    );
  });

  return (
    <>
      <StyledGalleryDiv>{animalTags}</StyledGalleryDiv>
    </>
  );
}
