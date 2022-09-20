import React, { useEffect, useRef, useState } from "react";
import loadCongress from "../scripts/loadCongress";
import Graph from "./Graph";
import Search from "./Search";
import ControlPanel from "./ControlPanel";

export const AppStateContext = React.createContext({});

const App = () => {
  const [graphData, setGraphData] = useState(null);
  const [graphType, setGraphType] = useState("3D");

  const [chamber, setChamber] = useState("house");
  const [congressNumber, setCongressNumber] = useState(115);

  const [focusedMember, setFocusedMember] = useState(null);

  useEffect(() => {
    console.log(
      `✅ UseEffect detected updated congress number: ${congressNumber}`
    );
    (async () => {
      setGraphData(null);

      const { nodes, links } = await loadCongress(congressNumber);

      setGraphData({ nodes, links });
    })();
  }, [congressNumber]);

  return (
    // React state management go brrr
    <AppStateContext.Provider
      value={{
        congressNumber,
        setCongressNumber,
        graphData,
        setGraphData,
        graphType,
        setGraphType,
        chamber,
        setChamber,
        focusedMember,
        setFocusedMember,
      }}
    >
      <>
        <Search />
        <ControlPanel />
        <Graph />
      </>
    </AppStateContext.Provider>
  );
};

export default App;
