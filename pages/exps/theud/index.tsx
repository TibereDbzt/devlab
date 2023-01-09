import SliderGrid from "../../../experiments/theud/components/SliderGrid";
import {projects} from "../../../experiments/theud/content";
import {useState} from "react";
import Link from "next/link";
import ButtonSwitchLayout from "../../../experiments/theud/components/ButtonSwitchLayout";

export default function Index() {
    const [gridLayout, setGridLayout] = useState(false);

    const projectItems = projects.map((project, index) => (
        <Link href={`theud/${project.name}`} className="inline-block relative w-full h-full select-none" draggable={false} key={project.id}>
            <video muted autoPlay loop className="absolute w-full h-full object-cover">
                <source src={project.cover} />
            </video>
        </Link>
    ));

    const handleClickLayout = () => {
        setGridLayout(!gridLayout);
    }

    return (
        <div className="w-full h-screen bg-[#090909]">
            <SliderGrid gridLayout={gridLayout} slidesContent={projectItems} />
            <ButtonSwitchLayout gridLayout={gridLayout} onClick={handleClickLayout}/>
        </div>
    )
}
