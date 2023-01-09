import React, {Dispatch, ReactNode, SetStateAction, useEffect} from "react";
import {motion, MotionValue, useMotionValue, useSpring, useTransform} from "framer-motion";
import {wrapRange} from "../../../utils/maths";
import classNames from "classnames";

interface SlideProps {
    key: number;
    index: number;
    gridLayout: boolean;
    content: ReactNode;
    panX: MotionValue,
    baseTranslateX: number;
    minTranslateX: number;
    maxTranslateX: number;
    sliderWidth: number;
    colStart: number,
    rowStart: number,
    setHoveredSlideIndex: Dispatch<SetStateAction<null | number>>;
    hoveredSlideIndex: null | number;
}

export default function Slide({
                                  index,
                                  gridLayout,
                                  content,
                                  baseTranslateX,
                                  minTranslateX,
                                  maxTranslateX,
                                  panX,
                                  sliderWidth,
                                  colStart,
                                  rowStart,
                                  setHoveredSlideIndex,
                                  hoveredSlideIndex,
                              }: SlideProps) {

    const translateX = useMotionValue(0);
    const springBaseTranslateX = useSpring(baseTranslateX, {stiffness: 300, damping: 50});
    const brightnessSlider = useTransform(
        translateX,
        [minTranslateX / 2, 0, maxTranslateX / 2],
        [0.15, 1, 0.15]
    );
    const brightnessGrid = useSpring(0.15, {stiffness: 300, damping: 50});

    const updateTranslateX = () => {
        let newTranslateX = wrapRange(springBaseTranslateX.get() + panX.get(), -sliderWidth / 2, sliderWidth / 2);
        translateX.set(newTranslateX);
    };

    const handleMouseEnter = () => {
        setHoveredSlideIndex(index);
    }

    const handleMouseLeave = () => {
        if (hoveredSlideIndex === index) setHoveredSlideIndex(null);
    }

    useEffect(() => {
        if (hoveredSlideIndex && hoveredSlideIndex !== index) brightnessGrid.set(0.15);
        else brightnessGrid.set(1);
    }, [hoveredSlideIndex]);

    useEffect(() => {
        springBaseTranslateX.set(baseTranslateX);
    }, [baseTranslateX]);

    useEffect(() => {
        panX.on("change", updateTranslateX);
        springBaseTranslateX.on("change", updateTranslateX);

        updateTranslateX();
    }, [updateTranslateX]);

    const slideClassName = classNames({
        'absolute w-[33.33333vw] h-[33.33333vh] p-5': !gridLayout,
        'relative w-full h-full p-3.5': gridLayout,
    });

    return (
        <motion.div layout onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} transition={{
            layout: {
                type: "spring",
                damping: 100,
                stiffness: 600,
            }
        }} className={slideClassName} style={{x: translateX, gridArea: `${rowStart} / ${colStart}`}}>
            <motion.div className="w-full h-full brightness-[var(--brightness)]" style={{'--brightness': gridLayout ? brightnessGrid : brightnessSlider } as React.CSSProperties}>
                {content}
            </motion.div>
        </motion.div>
    )
}
