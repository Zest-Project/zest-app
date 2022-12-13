import * as React from "react";
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled, Box } from "@mui/system";
import down_arrow from "../images/dropdown_arrow.svg";
import up_arrow from "../images/dropdown_up.svg";

const colors = {
  light_olive_green: "#517951",
  deep_olive_green: "#4E5E4E",
  light_forest_green: "#D2E0CE",
  dark_forest_green: "#213634",
  off_white: "#F6EFEF",
  salmon: "#F2C6B2",
  deep_yellow: "#FAC25C",
};

const StyledButton = styled("button")`
  font-size: 0.9rem;
  box-sizing: border-box;
  min-height: calc(1.5rem);
  min-width: 5rem;
  padding: 0.5rem;
  border-radius: 0.75rem;
  text-align: left;
  line-height: 1.5;
  background: ${colors["light_forest_green"]};
  color: ${colors["dark_forest_green"]};
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${colors["light_olive_green"]};
    border-color: ${colors["salmon"]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    border-color: "blue";
    outline: 3px solid "red";
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: url(${up_arrow});
    }
  }

  &::after {
    content: url(${down_arrow});
    float: right;
  }
`;

const StyledListbox = styled("ul")(() => ({
  fontSize: "0.9rem",
  boxSizing: "border-box",
  padding: "0.5rem",
  margin: "1rem 0 0.5rem 0",
  minWidth: "5rem",
  borderRadius: "0.75rem",
  overflow: "auto",
  outline: "0px",
  background: colors["light_forest_green"],
  color: colors["dark_forest_green"],
}));

const StyledOption = styled(OptionUnstyled)`
  list-style: none;
  padding: 0.5rem;
  border-radius: 0.75rem;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${colors["salmon"]};
    color: ${colors["dark_forest_green"]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${colors["light_olive_green"]};
    color: ${colors["dark_forest_green"]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${colors["light_olive_green"]};
    color: ${colors["dark_forest_green"]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: grey;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${colors["salmon"]};
    color: ${colors["dark_forest_green"]};
  }
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
});

export default function UnstyledSelectForm({
  values,
  handleSelected,
  selected,
}) {
  // const [selected, setSelected] = useState([]);

  return (
    <div>
      <Box>
        <CustomSelect
          defaultValue={values[0]}
          id="named-select"
          value={selected ? selected.name : " "}
          onChange={(event, newValue) => handleSelected(newValue)}
        >
          {values.map((value, index) => (
            <StyledOption key={value._id? value._id : index} value={value}>
              {" "}
              {value.name}{" "}
            </StyledOption>
          ))}
        </CustomSelect>
      </Box>
    </div>
  );
}
