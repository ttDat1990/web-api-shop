import React from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

Modal.setAppElement('#root');
function AnimatedModal({ isOpen, onRequestClose, content, style, ...otherProps }) {
    const modalProps = useSpring({
        from: {
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'translate(-50%, -200%)' : 'translate(-50%, 0)',
        },
        to: {
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -200%)',
        },
    });

    const modalStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 400,
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        zIndex: 9999,
        ...style,
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} {...otherProps}>
            <animated.div style={{ ...modalStyles, ...modalProps }}>{content}</animated.div>
        </Modal>
    );
}

export default AnimatedModal;
