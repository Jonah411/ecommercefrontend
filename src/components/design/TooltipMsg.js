import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const TooltipMsg = ({ text }) => {
  return (
    <div>
      <OverlayTrigger
        placement={"bottom"}
        overlay={<Tooltip id={`tooltip-${"bottom"}`}>{text}</Tooltip>}
      >
        <Button variant="secondary">
          <BsFillQuestionCircleFill />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default TooltipMsg;
