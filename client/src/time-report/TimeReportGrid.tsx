import { Table, CaretUpIcon, CaretDownIcon } from "evergreen-ui";
import { TimeReport } from "../types";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import "react-datepicker/dist/react-datepicker.css";
import TimeReportRow from "./TimeReportRow";
import EditTimeReportRow from "./EditTimeReportRow";
import { Project } from "../app/slices/appSlice";

type TimeReportGridType = {
    timereport: TimeReport[];
    sort?: "asc" | "desc";
    toggleSort: any;
    updateTimeReport: (timereport: TimeReport) => any;
    cancelTimeReport: (timereport: TimeReport) => any;
    saveTimeReport: (timereport: TimeReport) => any;
    removeTimeReport: (timereport: TimeReport) => any;
    isAdmin: boolean;
    projects: Project[];
};

const SortingHeaderCell = styled(Table.TextHeaderCell)`
  user-select: none;
  &:hover {
  cursor: pointer;
  }
  & svg {
  vertical-align: middle;
  }
  `;

const Wrapper = styled.div`
  background-color: white;
  `;

const TimeReportGrid = ({
    timereport,
    projects,
    sort,
    toggleSort,
    updateTimeReport,
    cancelTimeReport,
    saveTimeReport,
    removeTimeReport,
    isAdmin
}: TimeReportGridType) => {

    return (
        <Wrapper>
            <Table>
                <Table.Head padding="0px">
                    {!isMobile && (
                        <>
                            <SortingHeaderCell maxWidth="125px" onClick={() => toggleSort()}>
                                Datum
                                {sort === "desc" ? (
                                    <CaretUpIcon size={14} />
                                ) : (
                                    <CaretDownIcon size={14} />
                                )}
                            </SortingHeaderCell>
                        </>
                    )}
                    <Table.TextHeaderCell>Beskrivning</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Timmar</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Projekt</Table.TextHeaderCell>
                    <Table.TextHeaderCell></Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {timereport.map((timereport: TimeReport) => timereport.editMode ?
                        <EditTimeReportRow key={timereport.id} projects={projects} updateTimeReport={updateTimeReport} timeReport={timereport} saveTimeReport={saveTimeReport} cancelTimeReport={cancelTimeReport} /> :
                        <TimeReportRow key={timereport.id} timereport={timereport} onRemove={removeTimeReport} isAdmin={isAdmin} />
                    )}
                </Table.Body>
            </Table>
        </Wrapper>
    );
};

export default TimeReportGrid;