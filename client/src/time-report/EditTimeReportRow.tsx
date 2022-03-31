import React, { useState, forwardRef } from "react";
import {
  Table,
  TextInput,
  IconButton,
  CrossIcon,
  FloppyDiskIcon,
  majorScale,
  Combobox,
} from "evergreen-ui";
import { TimeReport } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Project } from "../app/slices/appSlice";
import { useDispatch } from "react-redux";
import timeReportSlice, {
  saveUpdatedTimeReport,
} from "./slices/timeReportSlice";
import { getProjectId, getProjectName } from "../helperMethods/appLibrary";

type EditTimeReportRowType = {
  timeReport: TimeReport;
  updateTimeReport: (timeReport: TimeReport) => any;
  saveTimeReport: (timeReport: TimeReport) => any;
  cancelTimeReport: (timeReport: TimeReport) => any;
  projects: Project[];
};

type EvergreenDatePickerProps = {
  selectedTime: Date;
  onChange: (date: Date) => any;
};

const EvergreenDatePicker = ({
  selectedTime,
  onChange,
}: EvergreenDatePickerProps) => {
  const ExampleCustomInput = forwardRef(({ onClick, value }: any, ref: any) => (
    <TextInput ref={ref} value={value} onClick={onClick} width="100%" />
  ));
  return (
    <DatePicker
      dateFormat="yyyy-MM-dd"
      selected={selectedTime}
      onChange={(date: any) => onChange(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

const EditTimeReportRow = ({
  timeReport,
  projects,
  updateTimeReport,
  saveTimeReport,
  cancelTimeReport,
}: EditTimeReportRowType) => {
  const dispatch = useDispatch();
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isHourValid, setIsHourValid] = useState(true);
  const [isProjectValid, setIsProjectValid] = useState(true);

  const [date, setDate] = useState(timeReport.time);
  const [description, setDescription] = useState(timeReport.description);
  const [hours, setHours] = useState(timeReport.hours);
  const [project, setProject] = useState(getProjectName(timeReport.project_id, projects));
 
  const submitTimeReport = (timeReport: TimeReport) => {
    if (isFormValid(timeReport)) {

      if (timeReport.id > 0) {
        dispatch(saveUpdatedTimeReport(timeReport));
      } else {
        saveTimeReport(timeReport);
      }
    }
  };

  const isFormValid = (timeReport: TimeReport) => {
    let isValid = true;
    if (!timeReport.description) {
      setIsDescriptionValid(false);
      isValid = false;
    } else {
      setIsDescriptionValid(true);
    }

    if (timeReport.hours < 1) {
      setIsHourValid(false);
      isValid = false;
    } else {
      setIsHourValid(true);
    }

    if (!timeReport.project_id) {
      setIsProjectValid(false);
      isValid = false;
    } else {
      setIsProjectValid(true);
    }

    return isValid;
  };

  const updateProjectToState = (projectName: string) => {
    const project = projects.find(
      (project: Project) => project.project_name === projectName
    );

    if (project) {
      updateTimeReport({ ...timeReport, project_id: project.id });
    }
  };

  return (
    <Table.Row key={timeReport.id}>
      <Table.Cell maxWidth="125px">
        <EvergreenDatePicker
          selectedTime={date}
          onChange={(date) => setDate(date)
          }
        />
      </Table.Cell>
      <Table.Cell>
        <TextInput
          isInvalid={!isDescriptionValid}
          width="100%"
          value={description}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setDescription(event.currentTarget.value)
          }
        />
      </Table.Cell>
      <Table.Cell>
        <TextInput
          isInvalid={!isHourValid}
          type="number"
          width="100%"
          value={hours}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setHours(Number(event.currentTarget.value))
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Combobox
          width="100%"
          openOnFocus
          items={projects.map((projects) => projects.project_name)}
          onChange={(selected) => setProject(selected)}
          placeholder="Välj projekt..."
          selectedItem={project}
        />
      </Table.Cell>
      <Table.Cell justifyContent="right">
        <IconButton
          icon={FloppyDiskIcon}
          intent="success"
          marginRight={majorScale(1)}
          onClick={() => submitTimeReport({ ...timeReport, time: date, description: description, hours: hours, project_id: getProjectId(project, projects) })} 
        />
        <IconButton
          icon={CrossIcon}
          intent="danger"
          onClick={() => cancelTimeReport(timeReport)}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default EditTimeReportRow;
