export interface TableColumn {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
  render?: (row: any) => React.ReactNode;
}

export interface TableAction {
  label: string;
  onClick: (row: any) => void;
  color?: "primary" | "error" | "secondary" | "success";
}