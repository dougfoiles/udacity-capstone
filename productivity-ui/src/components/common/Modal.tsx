import React from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

const Backdrop = () => {
  return <div className="backdrop" />;
};

type Props = {
  children: JSX.Element;
};

const ModalOverlay = (props: Props): JSX.Element => {
  return (
    <div className="modal">
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props: Props): JSX.Element => {
  const portalElement = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement!)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </>
  );
};

export default Modal;
