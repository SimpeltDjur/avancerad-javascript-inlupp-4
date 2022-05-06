import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import axios from "axios";
import { IAnimal } from "./models/IAnimal";
import { Solo } from "./components/Solo";
import { Zoo } from "./components/Zoo";

function App() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  // Jag får en varning på den häringa VS vill att jag ska ha en [], normaltsett lyder jag min kompilator i hur jag designar men, om jag minns rätt
  // från föreläsningen så är en if-baserad lösning mer effektiv så jag kör på den.
  useEffect(() => {
    if (animals.length !== 0) return;
    setAnimals(JSON.parse(localStorage.getItem("animals") || "[]"));

    if (animals.length !== 0) {
      axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((responce) => {
          saveToLs(responce.data);
        });
    }
  });

  function saveToLs(animals: IAnimal[]) {
    setAnimals(animals);
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Zoo />} />
          <Route path="/Animal/:id" element={<Solo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
