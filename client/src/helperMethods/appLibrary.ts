
import { Project } from "../app/slices/appSlice";

export const getProjectName = (projectId : number, projects : Project[]) => {

    const project = projects.find((project: Project) => projectId === project.id);

    if(project){
        return project.project_name
    }
    //else return null;

}
export const getProjectId = (projectName : any, projects : Project[]) => {

    const project = projects.find(
        (project: Project) => project.project_name === projectName
      );

      if(project) {
          return project.id;
      }
      else return 0;
}
