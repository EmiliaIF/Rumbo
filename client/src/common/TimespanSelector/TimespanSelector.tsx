import { Pane } from "evergreen-ui";
import { TabFilter } from "../TabFilter";
import { DateFilter } from "../../types/index";

const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

interface YearMonths {
  [key: number]: number[];
}

type TimespanSelectorProps = {
  onChange: (filter: DateFilter) => void;
  yearMonths: YearMonths;
  filter: DateFilter
};

export const TimespanSelector = ({
  onChange,
  yearMonths,
  filter
}: TimespanSelectorProps) => {

  const years = Object.keys(yearMonths);
  // TODO - currentYear skall inte vara hårdkodat..
  const currentYear = 2021;
  
  // TODO - varför har vi hårdkodat 2021 här ?? 
  const months = yearMonths[filter.year] ?? yearMonths[currentYear];
  
  const selectedYear = filter.year ?? currentYear;
  
  const selectedMonth = filter.month ?? 0;
  const selectedMonthIndex = months.indexOf(selectedMonth); //TODO: Har kraschat här

  return (
    <Pane
      clearfix
      display="block"
      borderBottom="1px dotted #ccc"
      borderTop="1px dotted #ccc"
      marginTop="10px"
    >
      <Pane display="inline-block" paddingTop="10px" paddingBottom="10px">
        <TabFilter
          items={years.map((year) => year.toString())}
          onSelect={(index: number, value: any) => onChange({ ...filter, year: Number(value) })}
          selectedIndex={years.indexOf(selectedYear.toString())}
        />
      </Pane>
      <Pane
        display="inline-block"
        float="right"
        paddingTop="10px"
        paddingBottom="10px"
      >
        <TabFilter
          selectAllOption={true}
          items={months.map(month => allMonths[month - 1])}
          onSelect={(index: number, value: any) => { console.log('value', value, allMonths.indexOf(value)); onChange({ ...filter, month: allMonths.indexOf(value) + 1 }) }}
          selectedIndex={selectedMonthIndex}
        />
      </Pane>
    </Pane>
  );
};
