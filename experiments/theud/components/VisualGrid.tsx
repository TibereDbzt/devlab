import {motion} from "framer-motion";
import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {useEffect} from "react";

interface GridProps {
    gridLayout: boolean;
}

export default function VisualGrid({ gridLayout }: GridProps) {

    const [windowWidth, windowHeight] = useWindowDimensions();

    const transitionSide = {
        type: "spring",
        damping: 200,
        stiffness: 600,
    }

    const transitionCenter = {
        type: "spring",
        damping: 200,
        stiffness: 800,
    }

    const transitionFrame = {
        type: "spring",
        damping: 200,
        stiffness: 900,
    }

    const colLeftVariants = {
        hidden: {
            translateX: -((7/3) * windowWidth) / 14,
        },
        visible: {
            translateX: 0,
        },
    }

    const frameColVariants = {
        tap: (side: string) => ({
            translateX: (gridLayout ? 0 : (side === "left" ? -1 : 1 ) * 1.4 * (windowWidth / 100)),
        }),
    }

    const frameRowVariants = {
        tap: (side: string) => ({
            translateY: (gridLayout ? 0 : (side === "top" ? -1 : 1 ) * 1.4 * (windowHeight / 100)),
        }),
    }

    const colRightVariants = {
        hidden: {
            translateX: ((7/3) * windowWidth) / 14,
        },
        visible: {
            translateX: 0,
        },
    }

    const colCenterVariants = {
        hidden: {
            scaleY: 0,
        },
        visible: {
            scaleY: 1,
        },
    }

    return (
        <div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-evenly">
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
                <motion.div className="w-[1px] h-full bg-[#1a1a1a] origin-top" variants={colLeftVariants} animate={gridLayout ? "visible" : "hidden"} transition={transitionSide}></motion.div>
                <motion.div className="w-[1px] h-full bg-[#1a1a1a] origin-top" variants={frameColVariants} custom={"left"} transition={transitionFrame}></motion.div>
                <motion.div className="w-[1px] h-full bg-[#1a1a1a] origin-top" variants={colCenterVariants} animate={gridLayout ? "visible" : "hidden"} transition={transitionCenter}></motion.div>
                <motion.div className="w-[1px] h-full bg-[#1a1a1a] origin-top" variants={frameColVariants} custom={"right"} transition={transitionFrame}></motion.div>
                <motion.div className="w-[1px] h-full bg-[#1a1a1a] origin-top" variants={colRightVariants} animate={gridLayout ? "visible" : "hidden"} transition={transitionSide}></motion.div>
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
                <div className="w-[1px] h-full bg-[#1a1a1a] origin-top"></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-evenly flex-col">
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
                <motion.div className="w-full h-[1px] bg-[#1a1a1a] origin-top" variants={frameRowVariants} custom={"top"} transition={transitionFrame}></motion.div>
                <motion.div className="w-full h-[1px] bg-[#1a1a1a] origin-top" variants={frameRowVariants} custom={"bottom"} transition={transitionFrame}></motion.div>
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
                <div className="w-full h-[1px] bg-[#1a1a1a] origin-top"></div>
            </div>
        </div>
    )
}
