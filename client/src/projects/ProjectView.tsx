
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Employee, Project } from "../app/slices/appSlice";
import { TimespanSelector } from "../common/TimespanSelector";
import { ViewWrapper } from "../common/ViewWrapper";
import timeReportSlice, { fetchTimeReportsByProject } from "../time-report/slices/timeReportSlice";
import { DateFilter } from "../types";
import projectSlice from "./slices/projectSlice";
import ProjectGrid from "./ProjectGrid";
import { ErrorMessage } from "../common/ErrorMessage/ErrorMessage";

type ProjectViewType = {
  user: Employee;
}

const ProjectView = ({ user }: ProjectViewType) => {

  const dispatch = useDispatch();
  let params: any = useParams();

  // params.id - får vi fram vad vi skrivit efter /project/{dettaVärde}
  // hämta från slice alla project. 
  // const pprojects.find(se om id:t matchar)
  dispatch(projectSlice.actions.setProject(params.projectId));

  const timeReportMeta = useSelector((state: any) => state.timeReport.meta);
  const filter: DateFilter = useSelector(
    (state: any) => state.timeReport.filter
  );

  const project: Project = useSelector((state: any) => state.app.projects.find((project: Project) => project.id == params.projectId)); // TODO våre snyggare om params.projectId var av typen number? 

  useEffect(() => {
    dispatch(fetchTimeReportsByProject(project));
  }, [filter, user]);

  return (
    <>{ project ?
    <ViewWrapper title={project.project_name}>
      {<TimespanSelector onChange={(newFilter: DateFilter) =>
        dispatch(timeReportSlice.actions.setFilter(newFilter))
      }
        yearMonths={timeReportMeta}
        filter={filter}
      />}
    </ViewWrapper> : <ErrorMessage title={`Projektid ${params.projectId} finns inte, prova nåt annat!`}/>}
   <ProjectGrid/>
    </>
  );
};

export default ProjectView;
