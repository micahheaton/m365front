import React, { useRef } from "react";
import ReactSelect from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export const MultiSelect = (props) => {
  // isOptionSelected sees previous props.value after onChange
  const valueRef = useRef(props.value);
  valueRef.current = props.value;

  const selectAllOption = {
    value: "",
    label: "Select All",
  };

  const isSelectAllSelected = () =>
    valueRef.current.length === props.options.length;

  const isOptionSelected = (option) =>
    valueRef.current.some(({ value }) => value === option.value) ||
    isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...props.options];

  const getValue = () =>
    isSelectAllSelected() ? [selectAllOption] : props.value;

  const onChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      props.onChange([], actionMeta);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      props.onChange(
        props.options.filter(({ value }) => value !== option.value),
        actionMeta
      );
    } else {
      props.onChange(newValue || [], actionMeta);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "transparent",
      // borderColor: "#35517b",
      minHeight: "40px",
      height: "40px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0px 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "100%",
    }),
  };

  return (
    <ReactSelect
      isOptionSelected={isOptionSelected}
      isClearable={false}
      options={getOptions()}
      value={getValue()}
      onChange={onChange}
      components={{
        Option,
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
      // controlShouldRenderValue={false}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isMulti
    />
  );
};
