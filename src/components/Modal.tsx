import { MouseEvent, ReactElement, useEffect, useRef, useState } from "react";
import Styled, { keyframes } from "styled-components";

interface ContainerProps {
    height: string;
    $modalOpen: boolean;
}

export interface ModalProps  extends ContainerProps {
    modalHandler: (isOpen: boolean)=>void;
    children: ReactElement;
}

interface OverlayProps {
    $modalOpen: boolean;
}

const fadeIn = keyframes`
    from { opacity: 0;}
    to { opacity: 1}
`
const fadeOut = keyframes`
    from { opacity: 1;}
    to { opacity: 0;}
`

const slideUp = keyframes`
    from { transform: translateY(200px);}
    to { transform: translateY(0);}
`

const slideDown = keyframes`
    from { transform: translateY(0);}
    to { transform: translateY(200px);}
`


const Overlay = Styled.div<OverlayProps>`
    background-color:rgba(0,0,0,.3); 
    justify-content:center; //수평 중앙정렬
    align-items:center;     //수직 중앙정렬
    position:fixed;         // 포지션 픽스, 화면이 스크롤되더라도 고정되기 위함
    top:0;
    left:0;
    right:0;
    bottom:0;               //모든 방향에 0을 주면 화면에 꽉차게 됩니다.
    animation-duration: 0.25s;
    animation-timing-function: linear;
    animation-name: ${({$modalOpen}) => $modalOpen ? fadeIn : fadeOut};
    animation-fill-mode: forwards;
`
const Container = Styled.div<ContainerProps>`
    width:100%;
    height: ${({height})=> height};
    z-index: 999;
    position: absolute;
    bottom: 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 25px 25px 0 0;
    animation-duration: 0.25s;
    animation-timing-function: linear;
    animation-name: ${({$modalOpen})=> $modalOpen ? slideUp : slideDown};
    animation-fill-mode: forwards;
    color: #000000;
`

const ModalHeader = Styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0 20px;
`

const ModalContent = Styled.div`
    padding: 20px 20px 20px 20px;
`

const Modal = ({modalHandler, children, ...props} : ModalProps) => {
    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(props.$modalOpen);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mousedownHandler = (ev: Event) => {
            if (modalRef.current && !modalRef.current.contains(ev.target as HTMLElement)) {
                modalHandler(false);
            }
        }
        document.addEventListener("mousedown", mousedownHandler as EventListener);
        if(localVisible && !props.$modalOpen) {
            setAnimate(true);
            setTimeout(()=>setAnimate(false),250);
        }
        setLocalVisible(props.$modalOpen);
        return () => {
            document.removeEventListener('mousedown', mousedownHandler as EventListener);
        }
    },[props.$modalOpen, localVisible]);

    const closeModal = () => {
        modalHandler(false);
    }
    if(!localVisible && !animate) return null;
    return (
        <Overlay $modalOpen={props.$modalOpen}>
            <Container {...props} ref={modalRef}>
                <ModalHeader>
                    <span>Modal Title</span>
                    <button onClick={closeModal}>X</button>
                </ModalHeader>
                <ModalContent>
                    {children}  
                </ModalContent>
            </Container>
        </Overlay>
    )
}

export default Modal;