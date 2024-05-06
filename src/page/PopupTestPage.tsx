import { useState } from "react";
import Modal from "./Modal";



const PopupTestPage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = () => {
        console.log('handleClick');
        setModalOpen(true)
    }
    return (
        <>
            <button onClick={handleClick}>popup</button>
            <Modal modalHandler={setModalOpen} height="200px" $modalOpen={modalOpen}>
                <span>modal popup content</span>
            </Modal>
        </>
    )
}

export default PopupTestPage;