import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";

import { useContext, useEffect, useState } from "react";

import { AppStateContext } from "./App";
const colorMap = {
  I: "#A56DF0",
  D: "#3689D1",
  R: "#EE8B8B",
  L: "#DAC968"
};

const Graph = () => {
  const { graphData, graphType, chamber, focusedMember } =
    useContext(AppStateContext);

  useEffect(() => {
    console.log(`✅ UseEffect detected new focused member: ${focusedMember}`);
  }, [focusedMember]);

  // Generate props because I don't want to copy this 4 times lol
  const graphProps = (graphData, chamber) => {
    if (!graphData || !chamber) return null;

    const nodes = graphData.nodes.filter((node) => node.chamber === chamber);
    const links = graphData.links.filter((link) => link.chamber === chamber);
    return {
      graphData: { nodes, links },
      nodeId: "_id",
      linkVisibility: false,
      backgroundColor: "#eaeaea",
      nodeColor: (node) => colorMap[node.party] || "#BBBBBB",
      nodeLabel: (node) => `${node.firstName} ${node.lastName}`,
      nodeVisibility: (node) => node.chamber === chamber,
      showNavInfo: false,
      linkOpacity: 0.1,
    };
  };

  return (
    <>
      {graphData === null ? (
        <div className="loading">Loading data...</div>
      ) : (
        <div style={{ position: "relative" }}>
          {graphType === "2D" ? (
            <ForceGraph2D {...graphProps(graphData, chamber)} />
          ) : graphType === "3D" ? (
            <ForceGraph3D {...graphProps(graphData, chamber)} />
          ) : graphType === "VR" ? (
            <ForceGraphVR {...graphProps(graphData, chamber)} />
          ) : graphType === "AR" ? (
            <ForceGraphAR {...graphProps(graphData, chamber)} />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Graph;
