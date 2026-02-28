import { useQuery } from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { getProjects } from '../../api/projects';

export default function Dashboard() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome to your Portfolio Backoffice. Manage your projects and portfolio content here.
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FolderIcon color="primary" sx={{ fontSize: 48 }} />
                <Box>
                  <Typography variant="h3">{projects?.length ?? 0}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Projects
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
