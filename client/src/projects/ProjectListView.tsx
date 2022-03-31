import { Pane, Table, TableRow } from "evergreen-ui";
import { useEffect} from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Employee, Project } from "../app/slices/appSlice";
import { ViewWrapper } from "../common/ViewWrapper";
import { fetchTimeReportsByUser } from "../time-report/slices/timeReportSlice";
import { DateFilter } from "../types";
import { push } from "connected-react-router";

type ProjectViewType = {
  user: Employee;
}

const ProjectListView = ({ user }: ProjectViewType) => {

  const dispatch = useDispatch();

  let params = useParams();
  console.log("test", params);
  const timeReportMeta = useSelector((state: any) => state.timeReport.meta);
  const filter: DateFilter = useSelector(
    (state: any) => state.timeReport.filter
  );

  //Hämtar alla projekt i projects  
  const projects: Project[] = useSelector((state: any) => state.app.projects);
  const projectFilter = useSelector((state: any) => state.timeReport.filter.project);

  useEffect(() => {
    dispatch(fetchTimeReportsByUser(user));
  }, [projectFilter, filter, user]);



  //Funktion för rendera om till ProjectView 
  const getProjectView = (id: number) => {

    dispatch(push(`/project/${id}`))
  }

  return (

    <ViewWrapper title="Projekt">

      <Pane
        clearfix
        display="block"
        borderBottom="1px dotted #ccc"
        marginTop="10px"
      />

      {projects.map(project => <TableRow isSelectable onSelect={() => getProjectView(project.id)}><Table.TextCell>{project.project_name}</Table.TextCell></TableRow>)}

      <Pane
        clearfix
        display="block"
        borderBottom="1px dotted #ccc"
        marginTop="10px"
      />

    </ViewWrapper >
  );
};

export default ProjectListView;
