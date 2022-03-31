import { useEffect } from "react";
import { Pane, Spinner, Button } from "evergreen-ui";
import { Employee } from "../app/slices/appSlice";
import { TimeReport } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { ViewWrapper } from "../common/ViewWrapper";
import isAdminSelector from "../utils/isAdminSelector";
import timeReportSlice, {
  fetchTimeReportsByUser,
  fetchTimeReportsMeta,
  removeTimeReport,
  saveNewTimeReport
} from "./slices/timeReportSlice";
import { TimespanSelector } from "../common/TimespanSelector";
import TimeReportGrid from "./TimeReportGrid";
import { DateFilter } from "../types/index";
import { defaultDate } from "../utils/defaultDate";

type TimeReportViewType = {
  jwtToken: string;
  user: Employee;
  isAdmin: boolean;
};

const TimeReportView = ({ jwtToken, user, isAdmin }: TimeReportViewType) => {


  const dispatch = useDispatch();

  const filter: DateFilter = useSelector(
    (state: any) => state.timeReport.filter
  );

  const timeReports: TimeReport[] = useSelector(
    (state: any) => state.timeReport.entities
  );

  const showAddNew = () => {

    const date = defaultDate(filter.year, filter.month);
    dispatch(timeReportSlice.actions.addNew(date));

  }

  const isLoading: boolean =
    useSelector((state: any) => state.timeReport.loading) === "loading";

    //DOING - vi tog bort sortedTimeReports unshift() som inte funkar med vårt nya state. Hitta ny lösning för att lösa att timereport i edit-mode inte följer med i sortering. 
  // const newTimeReport: TimeReport[] = timeReports.filter(timereport => timereport.editMode);
  
  const sort = useSelector((state: any) => state.timeReport.sort);
  const timeReportMeta = useSelector((state: any) => state.timeReport.meta);
  // anv useSelect för att hämta alla projekt från statet
  const projects = useSelector((state: any) => state.app.projects);

  //DOING Behöver hämta projektets namn och id men just nu är det 401-kod från server-hållet.
  //Även en användare behöver tillgång till den sökvägen.
  useEffect(() => {
    if (projects.length) {
      dispatch(fetchTimeReportsByUser(user));
    }

  }, [dispatch, user, filter, projects]);

  useEffect(() => {
    dispatch(fetchTimeReportsMeta(user));
  }, [dispatch, user]);

  const desc = sort === "desc" ? -1 : 1;
  const sortedTimeReports = [...timeReports].sort((a, b) =>
    a.time < b.time ? -desc : desc
  );

  const renderButtons = () => isAdmin && <Button height={32} appearance="primary" intent="success" onClick={() => showAddNew()}>Lägg till</Button>;

  return (
    <ViewWrapper title="Timrapport" renderButtons={renderButtons}>
      {<TimespanSelector onChange={(newFilter: DateFilter) =>
        dispatch(timeReportSlice.actions.setFilter(newFilter))
      }
        yearMonths={timeReportMeta}
        filter={filter}
      />}
      <Pane marginTop="20px" display="block">
        {isLoading ? (
          <Pane height="250px" display="flex" textAlign="center">
            <Spinner margin="auto" />
          </Pane>
        ) : !sortedTimeReports.length ? (
          <>Inga transaktioner</>
        ) : (

          <TimeReportGrid
            timereport={sortedTimeReports}
            projects={projects}
            updateTimeReport={(timeReport: TimeReport) => dispatch(timeReportSlice.actions.updateTimeReport(timeReport))}
            cancelTimeReport={(timeReport: TimeReport) => dispatch(timeReportSlice.actions.cancelNew(timeReport))}
            saveTimeReport={(timeReport: TimeReport) => dispatch(saveNewTimeReport({ user, timeReport }))}
            removeTimeReport={(timeReport: TimeReport) => dispatch(removeTimeReport({ user, timeReport }))}
            sort={sort}
            toggleSort={() => dispatch(timeReportSlice.actions.toggleSort())}
            isAdmin={isAdmin}
          />

        )}
      </Pane>

    </ViewWrapper>
  );
};

export default TimeReportView;
