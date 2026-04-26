import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
} from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useTranslation } from "react-i18next";

import BaseDataTable from "../../components/ui/table/BaseDataTable";
import TableActions from "../../components/ui/table/TableActions";

import { api } from "../../api/axios";

const AdminIssues = () => {
  const { t } = useTranslation();

  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [form, setForm] = useState({
    volume: "",
    number: "",
    year: "",
    publishedDate: "",
    series: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [file, setFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const loadIssues = async () => {
    try {
      const res = await api.get("/issues");
      setIssues(res.data || []);
    } catch (err) {
      console.error(err);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const validate = () => {
    const newErrors: any = {};

    if (!form.volume || isNaN(Number(form.volume))) {
      newErrors.volume = "Volume must be a number";
    }

    if (!form.number || isNaN(Number(form.number))) {
      newErrors.number = "Number must be a number";
    }

    if (!form.year || isNaN(Number(form.year))) {
      newErrors.year = "Year must be a number";
    }

    if (!form.publishedDate) {
      newErrors.publishedDate = "Required";
    }

    if (!form.series) {
      newErrors.series = "Required";
    }

    if (!isEdit && !file) {
      newErrors.file = "PDF required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOpenCreate = () => {
    setIsEdit(false);
    setErrors({});
    setForm({
      volume: "",
      number: "",
      year: "",
      publishedDate: "",
      series: "",
    });
    setFile(null);
    setCoverImage(null);
    setModalOpen(true);
  };

  const handleEditOpen = (row: any) => {
    setIsEdit(true);
    setErrors({});
    setSelected(row);

    setForm({
      volume: String(row.volume),
      number: String(row.number),
      year: String(row.year),
      publishedDate: row.publishedDate,
      series: row.series,
    });

    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (isEdit) {
        await api.patch(`/issues/${selected.id}`, {
          volume: Number(form.volume),
          number: Number(form.number),
          year: Number(form.year),
          publishedDate: form.publishedDate,
          series: form.series,
        });
      } else {
        const formData = new FormData();

        formData.append("volume", String(Number(form.volume)));
        formData.append("number", String(Number(form.number)));
        formData.append("year", String(Number(form.year)));
        formData.append("publishedDate", form.publishedDate);
        formData.append("series", form.series);

        if (file) formData.append("file", file);
        if (coverImage) formData.append("coverImage", coverImage);

        await api.post("/issues", formData);
      }

      setModalOpen(false);
      loadIssues();
    } catch (err) {
      console.error(err);
      alert(isEdit ? t("commo.updateError") : t("commo.createError"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("commo.deleteConfirm"))) return;

    await api.delete(`/issues/${id}`);
    loadIssues();
  };

  const columns = [
    { field: "volume", headerName: t("admin.issues.volume") },
    { field: "number", headerName: t("admin.issues.number") },
    { field: "year", headerName: t("admin.issues.year") },
    { field: "series", headerName: t("admin.issues.series") },
    {
      field: "publishedDate",
      headerName: t("admin.issues.published"),
      render: (row: any) => new Date(row.publishedDate).toLocaleDateString(),
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h4" fontWeight={700}>
          {t("admin.issues.title")}
        </Typography>

        <Button
          variant="contained"
          onClick={handleOpenCreate}
          sx={{
            height: 40,
            px: 3,
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            boxShadow: "none",
          }}
        >
          {t("commo.create")}
        </Button>
      </Box>

      <BaseDataTable columns={columns} rows={issues} loading={loading} />

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEdit ? t("admin.issues.edit") : t("admin.issues.create")}
        </DialogTitle>

        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} mt={2}>
              {/* volume + number */}
              <Stack direction="row" spacing={2}>
                <TextField
                  type="number"
                  fullWidth
                  label={t("admin.issues.volume")}
                  value={form.volume}
                  error={!!errors.volume}
                  helperText={errors.volume}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, volume: e.target.value }))
                  }
                />

                <TextField
                  type="number"
                  fullWidth
                  label={t("admin.issues.number")}
                  value={form.number}
                  error={!!errors.number}
                  helperText={errors.number}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, number: e.target.value }))
                  }
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <DatePicker
                  views={["year"]}
                  label={t("admin.issues.year")}
                  value={form.year ? dayjs(form.year) : null}
                  onChange={(val) =>
                    setForm((p) => ({
                      ...p,
                      year: val ? val.year().toString() : "",
                    }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.year,
                      helperText: errors.year,
                    },
                  }}
                />

                <DatePicker
                  label={t("admin.issues.published")}
                  value={form.publishedDate ? dayjs(form.publishedDate) : null}
                  onChange={(val) =>
                    setForm((p) => ({
                      ...p,
                      publishedDate: val ? val.format("YYYY-MM-DD") : "",
                    }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.publishedDate,
                      helperText: errors.publishedDate,
                    },
                  }}
                />
              </Stack>

              <TextField
                fullWidth
                label={t("admin.issues.series")}
                value={form.series}
                error={!!errors.series}
                helperText={errors.series}
                onChange={(e) =>
                  setForm((p) => ({ ...p, series: e.target.value }))
                }
              />

              {!isEdit && (
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" component="label" fullWidth>
                    {file ? file.name : t("admin.issues.uploadPdf")}
                    <input
                      hidden
                      type="file"
                      onChange={(e) =>
                        e.target.files?.[0] && setFile(e.target.files[0])
                      }
                    />
                  </Button>

                  <Button variant="outlined" component="label" fullWidth>
                    {coverImage
                      ? coverImage.name
                      : t("admin.issues.uploadCover")}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] && setCoverImage(e.target.files[0])
                      }
                    />
                  </Button>
                </Stack>
              )}

              {errors.file && (
                <Typography color="error">{errors.file}</Typography>
              )}

              <Button variant="contained" onClick={handleSubmit}>
                {isEdit ? t("commo.save") : t("commo.create")}
              </Button>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminIssues;
