import {useRouter} from "next/router";
import {projects} from "../../../experiments/theud/content";

export default function ProjectName() {
    const router = useRouter()
    const {projectName} = router.query

    const projectData = projects.find(project => project.name === projectName);

    return (
        <div>
            <h1>{projectName}</h1>

            { projectData &&
                <div className="relative w-full h-screen">
                    <video muted autoPlay loop className="absolute top-0 left-0 w-full h-full object-cover bg-red">
                        <source src={projectData.cover}/>
                    </video>
                </div>
            }
        </div>
    )
}
