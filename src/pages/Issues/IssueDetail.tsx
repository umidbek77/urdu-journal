import { useParams, Link } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import CurrentIssue from "./CurrentIssue";
import { api } from "../../api/axios";

interface Issue {
  id: string;
  number: number;
  year: number;
  publishedDate: string;
  series: string;
  coverImageUrl?: string;
  pdfUrl?: string;
}

const CustomBreadcrumbs = ({ currentPage, parentPage }: any) => (
  <Typography sx={{ mb: 2 }}>
    <Link to="/">Home</Link> /{" "}
    {parentPage && (
      <>
        <Link to={parentPage.path}>{parentPage.name}</Link> /
      </>
    )}
    {currentPage}
  </Typography>
);

const IssueDetail: React.FC = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);

  const fetchIssue = async () => {
    try {
      const res = await api.get("/issues");
      const found = res.data.find((i: Issue) => i.id === issueId);
      setIssue(found);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssue();
  }, [issueId]);

  if (!issue) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">Jurnal topilmadi</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CustomBreadcrumbs
        currentPage={`Jild ${issue.year} - Son ${issue.number}`}
        parentPage={{ name: "Arxiv", path: "/issues" }}
      />

      <Box sx={{ py: 4 }}>
        <CurrentIssue issue={issue} />
      </Box>
    </Container>
  );
};

export default IssueDetail;
