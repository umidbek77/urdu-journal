import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import BaseDataTable from "../../components/ui/table/BaseDataTable";
import TableActions from "../../components/ui/table/TableActions";

import {
  getEditors,
  createEditor,
  deleteEditor,
  updateEditor,
} from "../../api/admin.api";

import { CATEGORY_OPTIONS } from "../../constants/categories";

const AdminEditors = () => {
  const { t } = useTranslation();

  const [editors, setEditors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    categories: [] as string[],
  });

  const [editOpen, setEditOpen] = useState(false);
  const [selectedEditor, setSelectedEditor] = useState<any>(null);

  const loadEditors = async () => {
    try {
      const res = await getEditors();
      setEditors(res.data?.data || res.data);
    } catch (err) {
      console.error(err);
      setEditors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEditors();
  }, []);

  const handleCreate = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      form.categories.length === 0
    ) {
      alert(t("common.fillFields"));
      return;
    }

    try {
      await createEditor(form);

      setForm({
        name: "",
        email: "",
        password: "",
        categories: [],
      });

      loadEditors();
    } catch (err) {
      console.error(err);
      alert(t("commo.createError"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("commo.deleteConfirm"))) return;

    await deleteEditor(id);
    loadEditors();
  };

  const handleEditOpen = (editor: any) => {
    setSelectedEditor({
      ...editor,
      categories: editor.categories || [],
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedEditor.name || !selectedEditor.email) {
      alert(t("commo.fillFields"));
      return;
    }

    try {
      await updateEditor(selectedEditor.id, {
        name: selectedEditor.name,
        email: selectedEditor.email,
      });

      setEditOpen(false);
      loadEditors();
    } catch (err) {
      console.error(err);
      alert(t("commo.updateError"));
    }
  };

  const columns = [
    { field: "name", headerName: t("admin.editors.name") },
    { field: "email", headerName: t("admin.editors.email") },

    {
      field: "categories",
      headerName: t("admin.editors.categories"),
      render: (row: any) => (
        <Stack direction="row" spacing={1}>
          {(row.categories || []).map((c: string) => (
            <Chip key={c} label={c} size="small" />
          ))}
        </Stack>
      ),
    },

    {
      field: "actions",
      headerName: t("commo.actions"),
      render: (row: any) => (
        <TableActions
          row={row}
          actions={[
            {
              label: t("commo.edit"),
              onClick: () => handleEditOpen(row),
            },
            {
              label: t("commo.delete"),
              onClick: () => handleDelete(row.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2} fontWeight={700}>
        {t("admin.editors.title")}
      </Typography>

      <Paper
        sx={{ p: 2.5, mb: 2, borderRadius: 3, border: "1px solid #e5e7eb" }}
      >
        <Typography variant="h6" mb={1} fontWeight={600}>
          {t("admin.editors.create")}
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            label={t("admin.editors.name")}
            size="small"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <TextField
            label={t("admin.editors.email")}
            size="small"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />

          <TextField
            label={t("admin.editors.password")}
            type="password"
            size="small"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
          />

          <TextField
            select
            label={t("admin.editors.categories")}
            size="small"
            sx={{ minWidth: 220 }}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => (selected as string[]).join(", "),
            }}
            value={form.categories}
            onChange={(e) => {
              const value = e.target.value;
              setForm((p) => ({
                ...p,
                categories:
                  typeof value === "string" ? value.split(",") : value,
              }));
            }}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              height: 40,
              minWidth: 140,
              px: 3,
              flexGrow: 1,
              maxWidth: 200,
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            {t("commo.create")}
          </Button>
        </Stack>
      </Paper>

      <BaseDataTable columns={columns} rows={editors} loading={loading} />

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("admin.editors.edit")}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label={t("admin.editors.name")}
              value={selectedEditor?.name || ""}
              onChange={(e) =>
                setSelectedEditor((p: any) => ({
                  ...p,
                  name: e.target.value,
                }))
              }
            />

            <TextField
              label={t("admin.editors.email")}
              value={selectedEditor?.email || ""}
              onChange={(e) =>
                setSelectedEditor((p: any) => ({
                  ...p,
                  email: e.target.value,
                }))
              }
            />

            <TextField
              select
              label={t("admin.editors.categories")}
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (selected as string[]).join(", "),
              }}
              value={selectedEditor?.categories || []}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedEditor((p: any) => ({
                  ...p,
                  categories:
                    typeof value === "string" ? value.split(",") : value,
                }));
              }}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>
            {t("commo.cancel")}
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            {t("commo.save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminEditors;
