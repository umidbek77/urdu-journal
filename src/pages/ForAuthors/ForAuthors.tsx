import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  type StepIconProps,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LaunchIcon from "@mui/icons-material/Launch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScienceIcon from "@mui/icons-material/Science";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningIcon from "@mui/icons-material/Warning";
import SchoolIcon from "@mui/icons-material/School";
import DownloadIcon from "@mui/icons-material/Download";
import GavelIcon from "@mui/icons-material/Gavel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TimerIcon from "@mui/icons-material/Timer";
import VerifiedIcon from "@mui/icons-material/Verified";
import CustomBreadcrumbs from "../../components/ui/Breadcrumbs";
import PdfViewerModal from "../../components/ui/PdfViewerModal";

const PRIMARY_COLOR = "#1A237E";
const SECONDARY_COLOR = "#FFC107";
const LIGHT_BACKGROUND = "#F8F9FA";

const UsefulLinks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [currentPdfTitle, setCurrentPdfTitle] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPdfUrl("");
    setCurrentPdfTitle("");
  };

  return (
    <>
      <Box
        mt={4}
        p={4}
        bgcolor="#E8EAF6"
        borderRadius={2}
        textAlign="center"
        sx={{ border: `1px solid ${PRIMARY_COLOR}`, boxShadow: "none" }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: PRIMARY_COLOR, mb: 1 }}
        >
          <MenuBookIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Maqola
          namunasi
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Maqolani formatlash bo'yicha rasmiy namunaviy faylni (.docx) yuklab
          olishingiz mumkin
        </Typography>
        <a
          href="https://docs.google.com/document/d/1gQfx5Iuv3CtAoWdOGD30WvvbDUBF3_57iI5R-5uZDs4/edit?usp=sharing"
          target="blank"
          download={"Template.docx"}
        >
          <Button
            variant="contained"
            //  onClick={downloadLocalDocx}
            startIcon={<DownloadIcon />}
            sx={{
              bgcolor: SECONDARY_COLOR,
              color: PRIMARY_COLOR,
              fontWeight: 700,
              "&:hover": { bgcolor: "#FFD700" },
            }}
          >
            Shablonni yuklab olish
          </Button>
        </a>
      </Box>

      <PdfViewerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        pdfUrl={currentPdfUrl}
        title={currentPdfTitle}
      />
    </>
  );
};

const stepIcons: { [key: number]: React.ReactElement } = {
  1: <GavelIcon />,
  2: <EditNoteIcon />,
  3: <CloudUploadIcon />,
  4: <TimerIcon />,
  5: <VerifiedIcon />,
};

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;
  const isCompleted = completed;
  const isActive = active;

  return (
    <Box
      sx={{
        zIndex: 1,
        color: isCompleted
          ? "white"
          : isActive
            ? SECONDARY_COLOR
            : PRIMARY_COLOR,
        width: 38,
        height: 38,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: isCompleted
          ? PRIMARY_COLOR
          : isActive
            ? PRIMARY_COLOR
            : LIGHT_BACKGROUND,
        border: isActive
          ? `3px solid ${SECONDARY_COLOR}`
          : isCompleted
            ? `3px solid ${PRIMARY_COLOR}`
            : `2px solid ${PRIMARY_COLOR}`,
        boxShadow: isActive ? `0 4px 10px 0 rgba(0,0,0,.25)` : "none",
      }}
    >
      {isCompleted ? (
        <CheckCircleOutlineIcon sx={{ color: SECONDARY_COLOR, fontSize: 24 }} />
      ) : (
        <Box
          sx={{
            color: isActive ? SECONDARY_COLOR : PRIMARY_COLOR,
            fontSize: 22,
          }}
        >
          {stepIcons[Number(icon)]}
        </Box>
      )}
    </Box>
  );
};

interface StructureItem {
  id: string;
  title: string;
  icon: React.ReactElement;
  languages?: string;
  description: string;
  note?: string;
}

const ARTICLE_STRUCTURE_RULES: StructureItem[] = [
  {
    id: "author-info",
    title: "Muallif to'g'risida ma'lumot",
    icon: <PersonIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "O'zbek, Rus, Ingliz",
    description:
      "Muallif(lar)ning ism-familiyasi va otasining ismi to'liq yozilishi, lavozimi, ilmiy unvoni va darjasi, e-maili, telefon raqami yozilishi shart.",
    note: "Barcha maʼlumotlar uch tilda taqdim etilishi kerak.",
  },
  {
    id: "title",
    title: "Maqola mavzusi (Title)",
    icon: <TitleIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "O'zbek, Rus, Ingliz",
    description:
      "Mavzu qisqa, lo'nda shakllantirilgan bo'lib, tadqiqot yo'nalishini aniq ifoda etishi lozim.",
  },
  {
    id: "abstract",
    title: "Maqola annotatsiyasi (Abstract)",
    icon: <DescriptionIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "O'zbek, Rus, Ingliz",
    description:
      "5 qatordan kam, 15 qatordan oshmagan holda beriladi. Unda tadqiqat muammosi, dolzarbligi, metodologiya, tadqiqat natijalari va ilmiy/amaliy hissasi qisqacha bayon qilinadi.",
    note: "Annotatsiya strukturasi: Muammo > Dolzarblik > Metodologiya > Natijalar > Xulosa.",
  },
  {
    id: "keywords",
    title: "Kalit so'zlar (Key words)",
    icon: <VpnKeyIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "O'zbek, Rus, Ingliz",
    description:
      "Maqola mazmuni va maqsadini ochib beruvchi kalit so'zlar hisoblanadi. Har biri asosiy matnda ko'proq takrorlanishi tavsiya etiladi.",
  },
  {
    id: "introduction",
    title: "Kirish (Introduction)",
    icon: <LaunchIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "Yo'q",
    description:
      "Tadqiqat muammosi, uning maqsad va vazifalari yoritiladi. Mavzuning tanlanish asosi, dolzarbligi va ilmiy ahamiyati tushuntiriladi.",
  },
  {
    id: "lit-review",
    title: "Mavzuga oid adabiyotlarning tahlili",
    icon: <MenuBookIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "Yo'q",
    description:
      "Tadqiq etilayotgan muammo yuzasidan muallifning bilim darajasi, mavjud intellektual hududni baholash va tanqidiy tahlil orqali tadqiqat savollarini oydinlashtirishni ko'rsatadi.",
  },
  {
    id: "methodology",
    title: "Tadqiqat metodologiyasi",
    icon: <ScienceIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "Yo'q",
    description:
      "Tadqiqatning umumiy xaritasi, falsafasi (deduksion/induksion), dizayni, ma'lumot olish yo'llari, tadqiqat obyektining tanlovi (sampling), strategiya (eksperiment, keys-stadi va h.k.) va tadqiqat etikasini belgilash. Metodologiya ishonchlilik (reliability) va aniqlilikni (validity) asoslashi kerak.",
  },
  {
    id: "analysis-results",
    title: "Tahlil va natijalar",
    icon: <AnalyticsIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "Yo'q",
    description:
      "Metodologiyada belgilangan tahlil usullari orqali yig'ilgan ma'lumotlarning tahlilini amalga oshiradi. Faqat tahlil usulining natijalari ifoda etiladi, muhokama keyingi qismda bo'ladi.",
  },
  {
    id: "conclusion",
    title: "Xulosa va takliflar",
    icon: <LightbulbIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "Yo'q",
    description:
      "Tadqiqat maqsad va vazifalarining bajarilganligi, tadqiqat savollarining javob topganligi, asosiy natijalar bo'yicha umumiy xulosalar, takliflar va kelajak tadqiqot yo'nalishlari maqolaning asosini tashkil etishi lozim.",
  },
  {
    id: "references",
    title: "Foydalanilgan adabiyotlar ro'yxati",
    icon: <BookmarksIcon sx={{ color: PRIMARY_COLOR }} />,
    languages: "Yo'q",
    description:
      "Tadqiqatda foydalanilgan barcha adabiyotlarning ro'yxati [1], [2] ketma-ketligida qo'yiladi. Matnda havola [1; 25–26-b.] shaklida berilishi kerak. Kitob va maqola ma'lumotlari to'liq ko'rsatilishi shart.",
  },
];

const ArticleStructure: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>("author-info");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 5,
        mb: 4,
        bgcolor: "white",
        borderRadius: 2,
        border: `1px solid #E0E0E0`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 800,
          color: PRIMARY_COLOR,
          borderBottom: `3px solid ${PRIMARY_COLOR}`,
          pb: 1,
        }}
      >
        Maqola tuzilmasining rasmiy talablari
      </Typography>

      {ARTICLE_STRUCTURE_RULES.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          sx={{
            border:
              expanded === item.id
                ? `2px solid ${PRIMARY_COLOR}`
                : "1px solid #E0E0E0",
            mb: 1.5,
            borderRadius: "6px !important",
            "&.Mui-expanded": {
              m: "10px 0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: PRIMARY_COLOR }} />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
            sx={{
              bgcolor: expanded === item.id ? "#F0F3F7" : "inherit",
              borderRadius: "5px",
              "& .MuiAccordionSummary-content": { alignItems: "center" },
            }}
          >
            <Box display="flex" alignItems="center" width="100%">
              <Box
                sx={{
                  mr: 2,
                  p: 1,
                  borderRadius: "4px",
                  bgcolor: LIGHT_BACKGROUND,
                  border: `1px solid #D0D0D0`,
                }}
              >
                {item.icon}
              </Box>
              <Typography
                sx={{
                  flexShrink: 0,
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: expanded === item.id ? PRIMARY_COLOR : "text.primary",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: `1px dashed #D0D0D0`,
              bgcolor: "#FFFFFF",
              py: 3,
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                color: "text.primary",
                lineHeight: 1.7,
                fontSize: "1.0rem",
              }}
            >
              {item.description}
            </Typography>
            {item.note && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#F0F8FF",
                  borderLeft: "4px solid #1A73E8",
                  pl: 2,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "block", fontWeight: 700, color: "#1A73E8" }}
                >
                  QO'SHIMCHA KO'RSATMA:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "block", color: "text.secondary" }}
                >
                  {item.note}
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box
        mt={5}
        p={4}
        borderRadius={2}
        border={`2px solid #D32F2F`}
        bgcolor="#FFF3F3"
        textAlign="left"
        boxShadow="0 0 8px rgba(211,47,47,0.1)"
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "#D32F2F", mb: 1 }}
        >
          <WarningIcon sx={{ verticalAlign: "middle", mr: 1, fontSize: 30 }} />
          RASMIY OGOHLANTIRISH
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: "text.primary" }}
        >
          Yuqoridagi rasmiy talablar va tuzilmaga to'liq javob bermagan
          qo'lyozmalar, tahririyat tomonidan ko'rib chiqilmasdan rad etilishi
          mumkin. Iltimos, barcha qoidalarga qat'iy rioya qiling.
        </Typography>
      </Box>

      <Box
        mt={3}
        p={4}
        borderRadius={2}
        border={`2px solid ${PRIMARY_COLOR}`}
        bgcolor="#F0F8FF"
        textAlign="left"
        boxShadow="0 0 8px rgba(26,35,126,0.1)"
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: PRIMARY_COLOR, mb: 1 }}
        >
          <CheckCircleOutlineIcon
            sx={{ verticalAlign: "middle", mr: 1, fontSize: 30 }}
          />
          Nashr qilish turi
        </Typography>
        <Typography variant="body1" color="text.primary">
          Online
        </Typography>
      </Box>
    </Paper>
  );
};

const ForAuthors: React.FC = () => {
  const submissionSteps = [
    "Rasmiy qoidalarni ko'rib chiqish",
    "Qo'lyozmani ilmiy tayyorlash",
    "Onlayn yuborish (Tizim orqali)",
    "Taqriz jarayonini kutish",
    "Nashr etishga ruxsat olish",
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <CustomBreadcrumbs currentPage="Mualliflar uchun" />

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 2, fontWeight: 900, color: PRIMARY_COLOR }}
      >
        <SchoolIcon
          sx={{
            fontSize: 45,
            verticalAlign: "middle",
            mr: 2,
            color: PRIMARY_COLOR,
          }}
        />{" "}
        Ilmiy maqolani taqdim etish
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 1, fontWeight: 400 }}
      >
        Ilmiy maqolani tadqim qilish bo'yicha yo'riqnoma
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          bgcolor: "#fff",
          border: "1px solid #E5E7EB",
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            color: PRIMARY_COLOR,
            mb: 4,
            letterSpacing: "0.5px",
          }}
        >
          Tadqiqotni taqdim qilish bosqichlari
        </Typography>

        <Stepper
          alternativeLabel
          activeStep={0}
          sx={{
            "& .MuiStepLabel-label": {
              mt: 1.5,
            },
            "& .MuiStepConnector-line": {
              borderColor: "#E0E0E0",
              borderTopWidth: 2,
            },
          }}
        >
          {submissionSteps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                icon={index + 1}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#374151",
                    textAlign: "center",
                    transition: "0.3s",
                  },
                  "&:hover .MuiStepLabel-label": {
                    color: PRIMARY_COLOR,
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Divider sx={{ my: 2, bgcolor: "#D0D0D0", height: "1px" }} />

      <ArticleStructure />

      <UsefulLinks />
    </Container>
  );
};

export default ForAuthors;
