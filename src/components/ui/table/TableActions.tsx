import {
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import type { TableAction } from "./types";

interface Props {
  row: any;
  actions: TableAction[];
}

const TableActions = ({ row, actions }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {actions.map((action, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              action.onClick(row);
              setAnchorEl(null);
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TableActions;