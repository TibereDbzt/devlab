import {motion} from "framer-motion";

interface ButtonSwitchLayoutProps {
    gridLayout: boolean;
    onClick: () => void;
}

export default function ButtonSwitchLayout({ gridLayout, onClick }: ButtonSwitchLayoutProps) {

    const boxTransition = {
        type: "spring",
        damping: 140,
        stiffness: 900,
    }

    return (
        <button onClick={onClick} className="fixed left-[2vw] bottom-[2vw] h-10 flex items-center gap-1.5">
            <motion.div className="w-3 h-2 bg-white" variants={{ grid: { translateY: -7, scaleY: 1.6, scaleX: 0.8 } }} animate={gridLayout ? "slider" : "grid"} transition={boxTransition}/>
            <motion.div className="w-3 h-2 bg-white" variants={{ grid: { translateY: 7, scaleY: 1.6, scaleX: 0.8 } }} animate={gridLayout ? "slider" : "grid"} transition={boxTransition}/>
            <motion.div className="w-3 h-2 bg-white" variants={{ grid: { scaleY: 1.6, scaleX: 0.8 } }} animate={gridLayout ? "slider" : "grid"} transition={boxTransition}/>
        </button>
    )
}
