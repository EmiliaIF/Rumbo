import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

type AutocompleteProps = {
  options: string[],
  setValue: (newValue: string) => void,
  value: string
};

const theme = {
  container: {
    "position": "relative"
  },
  input: {
    width: "100%",
    height: "32px",
    padding: "1px 12px",
    fontFamily: `"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    fontWeight: 300,
    fontSize: "12px",
    border: "1px solid rgb(216, 218, 229)",
    borderRadius: "4px",
    boxSizing: "border-box"
  },
  inputFocused: {
    outline: "none",
    boxShadow: "0 0 0 2px #d6e0ff",
    borderColor: "#ADC2FF"
  },
  inputOpen: {
  },
  suggestionsContainer: {
    display: "none"
  },
  suggestionsContainerOpen: {
    display: "block",
    position: "absolute",
    width: "100%",
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: `"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    fontWeight: 300,
    fontSize: "12px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  suggestion: {
    cursor: "pointer",
    padding: "10px 20px"
  },
  suggestionHighlighted: {
    backgroundColor: "#ddd"
  }
} as const;

export const Autocomplete = ({ options, value, setValue }: AutocompleteProps) => {

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = (value: any) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : inputLength === 1 ? options.filter(option =>
      option.toLowerCase().slice(0, inputLength) === inputValue
    ) : options.filter(option => option.toLowerCase().indexOf(inputValue) > -1);
  };

  const onChange = (event: any, { newValue }: { newValue: string }) => {
    setValue(
      newValue
    );
  };

  const inputProps = {
    value,
    onChange
  };

  return (
    <Autosuggest
      theme={theme}
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion: string) => suggestion}
      renderSuggestion={(suggestion) => <span>{suggestion}</span>}
      inputProps={inputProps}
    />
  );
};
