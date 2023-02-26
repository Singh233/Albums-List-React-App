import { useContext } from 'react';
import { MouseContext } from '../context/mouse-context';
import useMousePosition from '../hooks/useMousePosition';
import '../styles/customCursor.css';

const CustomCursor = () => {
    const { cursorType } = useContext(MouseContext);
    const { x, y } = useMousePosition();
    return (
        <>
            {/* <div
                style={{ left: `${x}px`, top: `${y}px` }}
                className={`ring ${cursorType}`}
            ></div> */}
            <div
                className={`dot animate__animated animate__faster ${cursorType === 'hovered' ? 'hovered  animate__bounceIn' : ''}}`}
                style={{ left: `${x}px`, top: `${y}px` }}
            >
                <div className="dotInner">
                    {cursorType === 'hovered' && <p>
                        Next
                        </p>}
                </div>
            </div>
        </>
    );
};

export default CustomCursor;
