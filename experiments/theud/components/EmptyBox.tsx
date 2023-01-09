import {useWindowDimensions} from "../../../hooks/useWindowDimensions";
import {motion} from "framer-motion";
import classNames from "classnames";

interface EmptyBoxProps {
    className: string;
}

export default function EmptyBox({ className }: EmptyBoxProps) {
    const [windowWidth, windowHeight] = useWindowDimensions();

    const adjacentWidth = ((7/3 * windowWidth) / 14) / 2;
    const oppositeWidth = ((11/3 * windowHeight) / 11) / 2;
    const angle = Math.atan(oppositeWidth / adjacentWidth) * 180 / Math.PI;

    const boxClassName = classNames(className, 'relative w-full h-full flex items-center justify-center overflow-hidden')

    return (
        <div className={boxClassName}>
            <motion.div className="absolute w-[200%] h-px bg-[#1a1a1a]" style={{ rotate: angle }}/>
            <motion.div className="absolute w-[200%] h-px bg-[#1a1a1a]" style={{ rotate: -angle }}/>
        </div>
    )
}
