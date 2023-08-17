import Tippy from '@tippyjs/react/headless';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Box = styled(animated.div)`
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    width: ${(props) => props.width || 'auto'};
`;
function Dropdown({ children, content, tooltipWidth, ...passProps }) {
    const config = { tension: 200, friction: 25 };
    const initialStyles = { opacity: 0, transform: 'translateY(10px)' };
    const [props, setSpring] = useSpring(() => initialStyles);

    function onMount() {
        setSpring({
            opacity: 1,
            transform: 'translateY(0px)',
            onRest: () => {},
            config,
        });
    }

    function onHide({ unmount }) {
        setSpring({
            ...initialStyles,
            onRest: unmount,
            config: { ...config, clamp: true },
        });
    }

    return (
        <Tippy
            interactive
            offset={[0, 1]}
            render={(attrs) => (
                <Box width={tooltipWidth} tabIndex="-1" style={{ ...props }} {...attrs}>
                    {content}
                </Box>
            )}
            animation={true}
            onMount={onMount}
            onHide={onHide}
            {...passProps}
        >
            {children}
        </Tippy>
    );
}

export default Dropdown;
