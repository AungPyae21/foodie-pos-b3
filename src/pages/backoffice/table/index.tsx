import ItemCard from "@/components/ItemCard";
import LayoutBackOffice from "@/components/LayoutBackOffice";
import NewTableDialog from "@/components/NewTableDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import { createTableParam } from "@/types/table";

const Table = () => {
  const [open, setOpen] = useState<boolean>(false);
  const locationId = useAppSelector((state) => state.app.selectedLocation?.id);
  const { tables: allTables } = useAppSelector((state) => state.table);
  const tableId = useAppSelector((state) => state.app.selectedLocation?.id);
  const tables = allTables.filter((item) => item.locationId === tableId);
  const [newTable, setNewTable] = useState<createTableParam>({
    name: "",
    locationId,
  });
  return (
    <LayoutBackOffice>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#265073", "&:hover": { bgcolor: "#236193" } }}
            onClick={() => setOpen(true)}
          >
            New Table
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {tables.map((table) => {
            return (
              <ItemCard
                key={table.id}
                title={table.name}
                icon={<TableBarIcon />}
                href={`/backoffice/table/${table.id}`}
              />
            );
          })}
        </Box>
      </Box>
      <NewTableDialog
        open={open}
        setOpen={setOpen}
        newTable={newTable}
        setNewTable={setNewTable}
      />
    </LayoutBackOffice>
  );
};
export default Table;
