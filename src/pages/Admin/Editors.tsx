import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { translateEnum } from "../../utils/enumTranslator";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEditor, setSelectedEditor] = useState<any>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const handleOpenCreate = () => {
    setIsEdit(false);
    setForm({
      name: "",
      email: "",
      password: "",
      categories: [],
    });
    setModalOpen(true);
  };

  const handleEditOpen = (editor: any) => {
    setIsEdit(true);
    setSelectedEditor(editor);
    setForm({
      name: editor.name,
      email: editor.email,
      password: "",
      categories: editor.categories || [],
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || (!isEdit && !form.password)) {
      alert(t("commo.fillFields"));
      return;
    }

    try {
      if (isEdit) {
        await updateEditor(selectedEditor.id, {
          name: form.name,
          email: form.email,
        });
      } else {
        if (form.categories.length === 0) {
          alert(t("commo.fillFields"));
          return;
        }

        await createEditor(form);
      }

      setModalOpen(false);
      loadEditors();
    } catch (err) {
      console.error(err);
      alert(isEdit ? t("commo.updateError") : t("commo.createError"));
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteEditor(deleteId);
      loadEditors();
    } catch (err) {
      console.error(err);
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
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
            <Chip key={c} label={translateEnum(t, "category", c)} size="small" />
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight={700}>
          {t("admin.editors.title")}
        </Typography>

        <Button
          variant="contained"
          onClick={handleOpenCreate}
          sx={{
            height: 42,
            px: 3,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {t("commo.create")}
        </Button>
      </Stack>

      <BaseDataTable columns={columns} rows={editors} loading={loading} />

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEdit ? t("admin.editors.edit") : t("admin.editors.create")}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label={t("admin.editors.name")}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />

            <TextField
              label={t("admin.editors.email")}
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
            />

            {!isEdit && (
              <TextField
                label={t("admin.editors.password")}
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
              />
            )}

            <TextField
              select
              label={t("admin.editors.categories")}
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={translateEnum(t, "category", value)} size="small" />
                    ))}
                  </Stack>
                ),
              }}
              value={form.categories}
              onChange={(e) => {
                const {
                  target: { value },
                } = e;

                setForm((p) => ({
                  ...p,
                  categories:
                    typeof value === "string" ? value.split(",") : value,
                }));
              }}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <MenuItem key={c} value={c}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: form.categories.includes(c)
                          ? "#1976d2"
                          : "#ccc",
                      }}
                    />
                    {translateEnum(t, "category", c)}
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>
            {t("commo.cancel")}
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            {isEdit ? t("commo.save") : t("commo.create")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{t("commo.deleteConfirm")}</DialogTitle>

        <DialogActions>
          <Button onClick={handleCancelDelete}>{t("commo.cancel")}</Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            {t("commo.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminEditors;
