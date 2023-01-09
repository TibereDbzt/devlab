import {projects} from "../../../experiments/theud/content";
import {Project} from "../../../experiments/theud/types";

function ProjectName({ project }: { project: Project }) {

    return (
        <div>
            <h1>{project.name}</h1>

            <div className="relative w-full h-screen">
                <video muted autoPlay loop className="absolute top-0 left-0 w-full h-full object-cover bg-red">
                    <source src={project.cover}/>
                </video>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const paths = projects.map(project => ({
        params: { projectName: project.name }
    }));

    return { paths, fallback: false }
}

export async function getStaticProps({ params } : any) {

    const project = projects.find(project => project.name === params.projectName);

    return {
        props: { project }
    }
}

export default ProjectName;
