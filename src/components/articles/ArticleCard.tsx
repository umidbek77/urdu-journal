import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Issue {
  id: string;
  number: number;
  year: number;
  series: string;
  publishedDate: string;
  coverImageUrl?: string;
}

interface ArticleCardProps {
  issue: Issue;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ issue }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 260,
        padding: 1.5,
        margin: "auto",
        transition: "all 0.25s ease",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
        },
      }}
      elevation={2}
    >
      <Box
        sx={{
          width: "100%",
          height: 260,
          overflow: "hidden",
          borderRadius: 2,
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <CardMedia
          component="img"
          image={issue.coverImageUrl || "/img_1.png"}
          alt="issue cover"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "primary.main", mb: 0.5 }}
        >
          {`Jild ${issue.year}, Son ${issue.number}`}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Seriyasi: {issue.series}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          {new Date(issue.publishedDate).toLocaleDateString()}
        </Typography>

        <Button
          variant="contained"
          size="small"
          fullWidth
          component={Link}
          to={`/issues/${issue.id}`}
          sx={{
            mt: 1,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Ko‘rish
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
