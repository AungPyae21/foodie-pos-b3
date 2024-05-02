import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { AddonCategory, Menu } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
interface Props {
  items: AddonCategory[];
  selected: number | undefined;
  setSelected: Dispatch<SetStateAction<number | undefined>>;
  title: string;
}
export default function SingleSelect({
  items,
  selected,
  setSelected,
  title,
}: Props) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{title}</InputLabel>
      <Select
        input={<OutlinedInput label={title} />}
        value={selected}
        label={title}
        onChange={(eve) => setSelected(Number(eve.target.value))}
      >
        {items.map((AddonCategory) => {
          return (
            <MenuItem key={AddonCategory.id} value={AddonCategory.id}>
              {AddonCategory.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
