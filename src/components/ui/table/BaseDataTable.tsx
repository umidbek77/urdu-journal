import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
} from "@mui/material";
import { useMemo, useState } from "react";
import TableToolbar from "./TableToolbar";
import type { TableColumn } from "./types";

interface Props {
  columns: TableColumn[];
  rows: any[];
  loading?: boolean;
}

const BaseDataTable = ({ columns, rows }: Props) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const rowsPerPage = 15;

  const filteredRows = useMemo(() => {
    if (!search) return rows;

    return rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [rows, search]);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
      }}
    >
      <TableToolbar onSearch={setSearch} />

      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f8fafc" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.map((row) => (
            <TableRow key={row.id} hover>
              {columns.map((col) => (
                <TableCell key={col.field}>
                  {col.render ? col.render(row) : row[col.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {paginatedRows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="flex-end">
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[15]}
        />
      </Box>
    </Paper>
  );
};

export default BaseDataTable;