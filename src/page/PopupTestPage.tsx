import { useState } from "react";
import Modal from "../components/Modal";
import { numberToKorean } from "../util/number";

const PopupTestPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    console.log("handleClick");
    setModalOpen(true);
  };
  return (
    <>
      <button onClick={handleClick}>popup</button>
      <Modal modalHandler={setModalOpen} height="200px" $modalOpen={modalOpen}>
        <>
          <span>modal popup content</span>
          <p>{numberToKorean(10000)}</p>
          <p>{numberToKorean(999999999)}</p>
        </>
      </Modal>
    </>
  );
};

export default PopupTestPage;
