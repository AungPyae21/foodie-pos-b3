import ItemCard from "@/components/ItemCard";

import NewTableDialog from "@/components/NewTableDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
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
  const handleQRImagePrint = (assetUrl: string) => {
    const imageWindow = window.open("");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>`
    );
  };
  return (
    <Box>
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
              <Box
                key={table.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ItemCard
                  title={table.name}
                  icon={<TableBarIcon />}
                  href={`/backoffice/table/${table.id}`}
                />
                <Button
                  onClick={() => {
                    handleQRImagePrint(table.assetUrl);
                  }}
                  sx={{ width: "fit-content" }}
                  variant="contained"
                >
                  Print Qr
                </Button>
              </Box>
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
    </Box>
  );
};
export default Table;
