import { Box, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

const TableToolbar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <TextField
        size="small"
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
        sx={{ width: 250 }}
      />
    </Box>
  );
};

export default TableToolbar;