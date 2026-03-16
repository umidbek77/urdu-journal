import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getAdminDashboard } from "../../api/admin.api";

const AdminDashboard = () => {

  const [stats,setStats] = useState<any>(null);

  useEffect(()=>{

    getAdminDashboard().then((res)=>{
      setStats(res.data);
    })

  },[])

  if(!stats) return null

  return (

    <Box p={3}>

      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      <Box display="flex" gap={3}>

        <Box flex="1">
          <Paper sx={{p:3}}>
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">{stats.users}</Typography>
          </Paper>
        </Box>

        <Box flex="1">
          <Paper sx={{p:3}}>
            <Typography variant="h6">Editors</Typography>
            <Typography variant="h4">{stats.editors}</Typography>
          </Paper>
        </Box>

        <Box flex="1">
          <Paper sx={{p:3}}>
            <Typography variant="h6">Articles</Typography>
            <Typography variant="h4">{stats.articles}</Typography>
          </Paper>
        </Box>

        <Box flex="1">
          <Paper sx={{p:3}}>
            <Typography variant="h6">Published</Typography>
            <Typography variant="h4">{stats.published}</Typography>
          </Paper>
        </Box>

      </Box>

    </Box>

  )

}

export default AdminDashboard