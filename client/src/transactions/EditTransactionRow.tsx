import React, { useState, forwardRef } from "react";
import {
  Table,
  TextInput,
  IconButton,
  CrossIcon,
  FloppyDiskIcon,
  majorScale
} from "evergreen-ui";
import { Transaction } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from '../common/Autocomplete';

type EditTransactionRowType = {
  transaction: Transaction;
  updateTransaction: (transaction: Transaction) => any;
  saveTransaction: (transaction: Transaction) => any;
  cancelTransaction: () => any;
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

const EditTransactionRow = ({
  transaction,
  updateTransaction,
  saveTransaction,
  cancelTransaction,
}: EditTransactionRowType) => {
  const dispatch = useDispatch();

  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitTransaction = (transaction: Transaction) => {
    if (isFormValid(transaction)) {
      saveTransaction(transaction);
    }
  };

  const isFormValid = (transaction: Transaction) => {
    let isValid = true;
    if (!transaction.description) {
      setIsDescriptionValid(false);
      isValid = false;
    } else {
      setIsDescriptionValid(true);
    }

    if (transaction.amount === 0) {
      setIsAmountValid(false);
      isValid = false;
    } else {
      setIsAmountValid(true);
    }

    return isValid;
  };

  const items: string[] = useSelector(
    (state: any) => state.transaction.descriptionSuggestions
  );

  return (
    <>
      <Table.Row key={transaction.id}>
        <Table.Cell maxWidth="125px">
          <EvergreenDatePicker
            selectedTime={transaction.time}
            onChange={(date) =>
              updateTransaction &&
              updateTransaction({ ...transaction, time: date })
            }
          />
        </Table.Cell>
        <Table.Cell  overflowY="visible" overflowX="visible">
          <Autocomplete
            value={transaction.description}
            setValue={(newValue) => updateTransaction({...transaction, description: newValue })}
            options={items}/>
        </Table.Cell>
        <Table.Cell>
        <TextInput
            isInvalid={!isAmountValid}
            type="number"
            width="100%"
            value={transaction.amount}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              updateTransaction &&
              updateTransaction({
                ...transaction,
                amount: Number(event.currentTarget.value),
              })
            }
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && submitTransaction(transaction)}
          />
        </Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell justifyContent="right">
          <IconButton
            icon={FloppyDiskIcon}
            intent="success"
            marginRight={majorScale(1)}
            onClick={() => submitTransaction(transaction)}
          />
          <IconButton
            icon={CrossIcon}
            intent="danger"
            onClick={() => cancelTransaction()}
          />
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default EditTransactionRow;
