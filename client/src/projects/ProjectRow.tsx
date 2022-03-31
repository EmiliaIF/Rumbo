import { Button, Table, TableCell } from "evergreen-ui";
import { useState } from "react";
import { Employee } from "../app/slices/appSlice";
import { TimeReport } from "../types";

// TODO Gick inte att typea till Employee, varför? 

type ProjectRow = {
    index: number,
    employee: Employee , 
    timereports : TimeReport[],
    days : number[]
}
const ProjectRow = ({index, employee, timereports, days} : ProjectRow) => {

    const [isNotModified, setIsNotModified] = useState(true);


     
      const getHours = (day: number) => {

        const timeReportsByDay = timereports.filter((timereport) => timereport.time.getDate() === day);

        const hours = timeReportsByDay
                        .map((timereport) => Number(timereport.hours))
                        .reduce((a,b) => a+b, 0);
        return hours;
      }

    return (
        <Table.Row isHighlighted={index % 2 === 0}>
                <Table.TextCell isNumber flexBasis={100} flexShrink={0} flexGrow={0}>{employee.firstname}</Table.TextCell> 
                
        {days.map((day) => <Table.TextCell flexBasis={56} flexShrink={0} flexGrow={0}>{getHours(day) != 0 ? getHours(day) : "-" } </Table.TextCell>)}
        <TableCell flexBasis={100} flexShrink={0} flexGrow={0}><Button disabled={isNotModified}>Spara</Button></TableCell>
        </Table.Row>
    )

}
export default ProjectRow;
