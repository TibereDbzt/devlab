import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {motion, MotionValue, useSpring} from "framer-motion";
import {useEffect, useState} from "react";

interface FrameProps {
    gridLayout: boolean;
    gridTranslateX: MotionValue;
    gridTranslateY: MotionValue;
    hideCross: boolean;
}

export default function Frame({gridLayout, gridTranslateX, gridTranslateY, hideCross}: FrameProps) {

    const [windowWidth, windowHeight] = useWindowDimensions();
    const [boxIndex, setBoxIndex] = useState({
        x: 0,
        y: 0,
    });
    const translateX = useSpring(0, {stiffness: 800, damping: 120});
    const translateY = useSpring(0, {stiffness: 800, damping: 120});

    const transitionWrapper = {
        type: "spring",
        damping: 170,
        stiffness: 820,
        restDelta: 0.001,
    }

    const transitionBounds = {
        type: "spring",
        damping: 200,
        stiffness: 600,
    }

    const crossTransition = {
        type: "spring",
        damping: 130,
        stiffness: 900,
    }

    const wrapperVariants = {
        tap: {
            scale: gridLayout ? 1 : 1.08,
        },
    }

    const sideLeftVariants = {
        grid: {
            translateX: 0,
        },
        slider: {
            translateX: -((7/3) * windowWidth) / 28,
        },
    }

    const sideRightVariants = {
        grid: {
            translateX: 0,
        },
        slider: {
            translateX: ((7/3) * windowWidth) / 28,
        },
    }

    const handleMouseMove = (e: MouseEvent): void => {
        if (!gridLayout) return;
        const xIndex = Math.floor((e.pageX - gridTranslateX.get() + 2/3 * windowWidth) / ((7/3) * windowWidth / 14));
        const yIndex = Math.floor((e.pageY - gridTranslateY.get() + 4/3 * windowHeight) / ((11/3) * windowHeight / 11));
        setBoxIndex({
            x: xIndex,
            y: yIndex,
        });
    }

    useEffect(() => {
        if (!gridLayout) return;
        translateX.set(boxIndex.x * ((7/3) * windowWidth / 14));
        translateY.set(boxIndex.y * ((11/3) * windowHeight / 11));
    }, [boxIndex]);

    useEffect(() => {
        if (!gridLayout) {
            translateX.set(((7/3) * windowWidth / 2) - (7/3) * windowWidth / 28);
            translateY.set(((11/3) * windowHeight / 2) - (11/3) * windowHeight / 22);
        } else {
            setBoxIndex({
                x: 6,
                y: 5,
            })
        }
    }, [windowWidth, windowHeight, gridLayout]);

    useEffect(() => {
        if (!gridLayout) return;
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    });

    return (
        <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
            <motion.div className="relative w-[calc(((7/3)*100vw)/14)] h-[33.3333vh] flex justify-between" style={{ x: translateX, y: translateY }} variants={wrapperVariants} transition={transitionWrapper}>
                <motion.div className="relative top-0 left-0 w-[70px] h-full" variants={sideLeftVariants} animate={gridLayout ? "grid" : "slider"} transition={transitionBounds}>
                    <div className="absolute top-0 left-0 w-full h-[70px]">
                        <span className="absolute top-0 left-0 w-full h-[1px] bg-white"/>
                        <span className="absolute top-0 left-0 w-[1px] h-full bg-white"/>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[70px]">
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white"/>
                        <span className="absolute bottom-0 left-0 w-[1px] h-full bg-white"/>
                    </div>
                </motion.div>
                <motion.div className="relative top-0 right-0 w-[70px] h-full" variants={sideRightVariants} animate={gridLayout ? "grid" : "slider"} transition={transitionBounds}>
                    <div className="absolute top-0 right-0 w-full h-[70px]">
                        <span className="absolute top-0 right-0 w-full h-[1px] bg-white"/>
                        <span className="absolute top-0 right-0 w-[1px] h-full bg-white"/>
                    </div>
                    <div className="absolute bottom-0 right-0 w-full h-[70px]">
                        <span className="absolute bottom-0 right-0 w-full h-[1px] bg-white"/>
                        <span className="absolute bottom-0 right-0 w-[1px] h-full bg-white"/>
                    </div>
                </motion.div>
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[31px] h-[30px]">
                    <motion.span className="absolute top-0 left-[15px] w-[1px] h-1/2 bg-white origin-top" variants={{ hidden: { scaleY: 0}}} animate={hideCross ? "hidden" : "visible"} transition={crossTransition}></motion.span>
                    <motion.span className="absolute right-0 top-[15px] w-1/2 h-[1px] bg-white origin-right" variants={{ hidden: { scaleX: 0}}} animate={hideCross ? "hidden" : "visible"} transition={crossTransition}></motion.span>
                    <motion.span className="absolute bottom-0 left-[15px] w-[1px] h-1/2 bg-white origin-bottom" variants={{ hidden: { scaleY: 0}}} animate={hideCross ? "hidden" : "visible"} transition={crossTransition}></motion.span>
                    <motion.span className="absolute left-0 top-[15px] w-1/2 h-[1px] bg-white origin-left" variants={{ hidden: { scaleX: 0}}} animate={hideCross ? "hidden" : "visible"} transition={crossTransition}></motion.span>
                </motion.div>
            </motion.div>
        </div>
    )
}
