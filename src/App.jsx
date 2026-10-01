import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Card from "./components/Card";
import data from "./components/data";
import "./index.css";
function App() {
  // const newData = data.map((d) => {
  //   return <Card key={d.name} {...d} />;
  // });
  return (
    <>
      {/* <main className="grid grid-cols-2 gap-y-4">{newData}</main> */}

      <Header />
      <Main />
    </>
  );
}

export default App;
