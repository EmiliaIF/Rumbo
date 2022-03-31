import { Table} from "evergreen-ui";
import {  useSelector } from "react-redux";
import { Employee } from "../app/slices/appSlice";
import { TimeReport } from "../types";
import ProjectRow from "./ProjectRow";

const ProjectGrid = () => {

  const days : number[] = [];
  const timereports = useSelector((state: any) => state.timeReport.entities);
  console.log("timrapporter för valt projekt ", timereports)

  // TODO Senare: Hämta endast de employees som är kopplade till projektet.
  const employees = useSelector((state: any) => state.app.employees);
  //console.log(employees);
  employees.map((em: Employee) => console.log(em));

  const filter = useSelector((state: any) => state.timeReport.filter);

  // TODO , berätta för Miranda varför vi inte fick nån info på 31 dec, då vi använde getDay() (som hämtar dag i veckan).
  for (let i = 0; i < new Date(filter.year, filter.month, 0).getDate(); i++) {
    days.push(i + 1);
  };
  console.log(days);

  return (
    <Table.Body overflow="scroll">
      <Table.Head>
         <Table.TextHeaderCell flexBasis={100} flexShrink={0} flexGrow={0}>Namn</Table.TextHeaderCell > 
        {days.map((day: number) => <Table.TextHeaderCell flexBasis={56} flexShrink={0} flexGrow={0}>{day}</Table.TextHeaderCell>)}
      </Table.Head>
        {employees.map((employee: Employee, index: number) => <ProjectRow index={index} employee={employee} timereports={timereports.filter((timereport: TimeReport) => timereport.email == employee.email)} days={days}/>)}
        
    </Table.Body>
  )

}

export default ProjectGrid;