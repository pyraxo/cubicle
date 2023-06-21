import React, { useState } from "react";
import "./style.css";

const LeftBranch = ({ event, description }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="LeftBranch">
      <div className="Header" onClick={() => setShow(!show)}>
        <span className="HeaderText">{event}</span> <br />
        {show === true && <p className="moreInfo">{description}</p>}
      </div>

      <div className="node-container">
        <div className="node-stick" />
        <div className="node-circle" />
        <div className="node-branch" />
      </div>
    </div>
  );
};

const RightBranch = ({ event, description }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="RightBranch">
      <div className="Right-Header" onClick={() => setShow(!show)}>
        <span className="HeaderText">{event}</span> <br />
        {show === true && <p className="moreInfo">{description}</p>}
      </div>

      <div className="node-container">
        <div className="node-stick" />
        <div className="node-circle" />
        <div className="right-node-branch" />
      </div>
    </div>
  );
};

const Portfolio = (props) => {
  return (
    <div className="Portfolio_Tree">
      <h1>Here's what {props.username}'s been up to.</h1>
      <LeftBranch
        event="Code EXP 2023"
        description="Did some Programming in CodeEXP 2022, ngl was one of the best hackathons ever."
      />
      <RightBranch
        event="What The Hack 2023"
        description="Not as cool as Code EXP but welp, there can only be one."
      />
      <LeftBranch
        event="Halloween Hacks 2023"
        description="Very spooky hackathon, pretty cool actually!"
      />
    </div>
  );
};

export default Portfolio;
