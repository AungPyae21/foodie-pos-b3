import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  selected: number[];
  setSelected: (value: SetStateAction<number[]>) => void;
  items: Menu[] | MenuCategory[];
}

const MultiSelect = ({ title, selected, setSelected, items }: Props) => {
  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>{title}</InputLabel>
        <Select
          input={<OutlinedInput label={title} />}
          value={selected}
          multiple
          onChange={(e) => {
            const selected = e.target.value as number[];
            setSelected(selected);
          }}
          renderValue={() => {
            return selected
              .map(
                (item) =>
                  items.find((param) => param.id === item) as
                    | Menu
                    | MenuCategory
              )
              .map((item) => item.name)
              .join(",");
          }}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={selected.includes(item.id)} />
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultiSelect;
