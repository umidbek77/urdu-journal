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
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

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
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()),
    );
  }, [rows, search]);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
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
            <TableRow
              key={row.id}
              hover
              sx={{
                height: 52,
              }}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    py: 1.5,
                  }}
                >
                  {col.render ? col.render(row) : row[col.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {paginatedRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{
                  borderBottom: "none",
                  py: 4,
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 680,
                      border: "1px solid #cbd5e1",
                      borderRadius: 3,
                      py: 4,
                      px: 6,
                      textAlign: "center",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <InboxOutlinedIcon
                      sx={{
                        fontSize: 64,
                        color: "#94a3b8",
                        mb: 1,
                      }}
                    />

                    <Box
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#0f172a",
                        mb: 0.5,
                      }}
                    >
                      No data found
                    </Box>

                    <Box
                      sx={{
                        fontSize: 15,
                        color: "#64748b",
                      }}
                    >
                      There is currently no information available
                    </Box>
                  </Box>
                </Box>
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
