import {ReactNode, useEffect, useState} from "react";
import {clamp, motion, PanInfo, useAnimationFrame, useMotionValue, useSpring, useTransform} from "framer-motion";
import Slide from "./Slide";
import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {useKeyPress} from "../../../hooks/useKeyPress";
import classNames from "classnames";
import {projects} from "../content";
import Frame from "./Frame";
import VisualGrid from "./VisualGrid";
import EmptyBox from "./EmptyBox";

interface SliderProps {
    slidesContent: ReactNode[];
    gridLayout: boolean;
}

export default function SliderGrid({slidesContent, gridLayout}: SliderProps) {

    const [windowWidth, windowHeight] = useWindowDimensions();

    const panTranslateX = useMotionValue(0);
    const panTranslateY = useMotionValue(0);

    const gridTranslateX = useMotionValue(0);
    const springGridTranslateX = useSpring(gridTranslateX, { damping: 100, stiffness: 600 });

    const gridTranslateY = useMotionValue(0);
    const springGridTranslateY = useSpring(gridTranslateY, { damping: 100, stiffness: 600 });

    const [slideWidth, setSlideWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState<number|null>(0);
    const [hoveredSlideIndex, setHoveredSlideIndex] = useState<number | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const gridTranslateXOffset = useTransform(
        mouseX,
        [0, windowWidth / 4, windowWidth / 4 * 2, windowWidth],
        [windowWidth / 16, 0, 0, -windowWidth / 16]
    )
    const gridTranslateYOffset = useTransform(
        mouseY,
        [0, windowHeight / 4, windowHeight / 4 * 2, windowHeight],
        [windowHeight / 10, 0, 0, -windowHeight / 10]
    )

    const arrowRightPress = useKeyPress(39);
    const arrowLeftPress = useKeyPress(37);
    const spacePress = useKeyPress(32);
    const panX = useMotionValue(0);
    const springPanX = useSpring(panX, {stiffness: 200, damping: 50});
    const slidesTranslateXOffset = slidesContent.length % 2 !== 0 ? -slideWidth / 2 : 0;

    const handlePan = (_: PointerEvent, info: PanInfo) => {
        if (gridLayout) {
            panTranslateX.set(clamp(-2/3 * windowWidth, 2/3 * windowWidth, panTranslateX.get() + info.delta.x * 2));
            panTranslateY.set(clamp(-4/3 * windowHeight, 4/3 * windowHeight, panTranslateY.get() + info.delta.y * 2));

        } else {
            setCurrentIndex(null);
            panX.set(panX.get() + info.delta.x);
        }
    }

    const handlePanEnd = () => {
        if (gridLayout) return;
        const index = -Math.round(panX.get() / slideWidth);
        setCurrentIndex(index);
    }

    const handleMouseMove = ({ clientX, clientY }: { clientX: number, clientY: number}) => {
        if (!gridLayout) return;
        mouseX.set(clientX);
        mouseY.set(clientY);
    }

    useEffect(() => {
        mouseX.set(windowWidth / 2);
        mouseY.set(windowHeight / 2);
        setSlideWidth(windowWidth / 3);
    }, [windowWidth]);

    useEffect(() => {
        if (gridLayout) return;
        if (arrowRightPress || spacePress) {
            if (currentIndex !== null) setCurrentIndex(currentIndex + 1);
        }
        if (arrowLeftPress) {
            if (currentIndex !== null) setCurrentIndex(currentIndex - 1);
        }
    }, [arrowRightPress, arrowLeftPress, spacePress]);

    useEffect(() => {
        if (currentIndex !== null) panX.set(-currentIndex * slideWidth);
    }, [currentIndex]);

    useEffect(() => {
        if (gridLayout && currentIndex !== null) {
            const offset = currentIndex % slidesContent.length;
            panX.set(-(currentIndex - offset) * slideWidth);
        } else {
            if (currentIndex !== null) panX.set(-currentIndex * slideWidth);
            panTranslateX.set(0);
            panTranslateY.set(0);
            gridTranslateXOffset.set(0);
            gridTranslateYOffset.set(0);
            mouseX.set(windowWidth / 2);
            mouseY.set(windowHeight / 2);
        }
    }, [gridLayout]);

    useAnimationFrame(() => {
        gridTranslateX.set(panTranslateX.get() + gridTranslateXOffset.get());
        gridTranslateY.set(panTranslateY.get() + gridTranslateYOffset.get());
    });

    const containerStyle = classNames({
        'cursor-grab' : gridLayout,
        'cursor-ew-resize' : !gridLayout,
    });

    const wrapperStyle = classNames('fixed w-[calc(7/3*100vw)] h-[calc(11/3*100vh)] left-[calc(-2/3*100vw)] top-[calc(-4/3*100vh)] touch-none', {
        'grid grid-cols-[repeat(14,_1fr)] grid-rows-[repeat(11,_1fr)] cursor-grab active:cursor-grabbing' : gridLayout,
        'flex items-center justify-center cursor-ew-resize' : !gridLayout,
    });

    return (
        <motion.div onPan={handlePan} onPanEnd={handlePanEnd} onMouseMove={handleMouseMove} whileTap="tap" className={containerStyle}>
            <motion.div className={wrapperStyle} style={{ x: springGridTranslateX, y: springGridTranslateY}}>
                <Frame gridLayout={gridLayout} gridTranslateX={gridTranslateX} gridTranslateY={gridTranslateY} hideCross={hoveredSlideIndex !== null}/>
                { gridLayout &&
                    <>
                        <EmptyBox className="col-start-3 row-start-5"/>
                        <EmptyBox className="col-start-7 row-start-4"/>
                        <EmptyBox className="col-start-11 row-start-7"/>
                        <EmptyBox className="col-start-7 row-start-[8]"/>
                        <EmptyBox className="col-start-9 row-start-[10]"/>
                        <EmptyBox className="col-start-3 row-start-[9]"/>
                    </>
                }
                <VisualGrid gridLayout={gridLayout} />
                {slidesContent.map((slide: ReactNode, index: number) => (
                    <Slide
                        key={index}
                        index={index}
                        gridLayout={gridLayout}
                        content={slide}
                        panX={springPanX}
                        baseTranslateX={gridLayout ? 0 : (index - slidesContent.length / 2) * slideWidth + slidesTranslateXOffset}
                        minTranslateX={-windowWidth / 2 - slideWidth / 2}
                        maxTranslateX={windowWidth / 2 + slideWidth / 2}
                        sliderWidth={slidesContent.length * slideWidth}
                        colStart={projects[index].colStart}
                        rowStart={projects[index].rowStart}
                        setHoveredSlideIndex={setHoveredSlideIndex}
                        hoveredSlideIndex={hoveredSlideIndex}
                    />
                ))}
            </motion.div>
            { !gridLayout && (
                <>
                    <div className="fixed top-0 left-0 w-[33.33333vw] h-screen cursor-w-resize" onClick={() => setCurrentIndex(prevIndex => prevIndex === null ? prevIndex : prevIndex - 1)} />
                    <div className="fixed top-0 right-0 w-[33.33333vw] h-screen cursor-e-resize" onClick={() => setCurrentIndex(prevIndex => prevIndex === null ? prevIndex : prevIndex + 1)} />
                </>
            )}
        </motion.div>
    )
}
