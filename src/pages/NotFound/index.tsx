import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h1" color="primary">404</Typography>
      <Typography variant="h5" gutterBottom>Page Not Found</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Go Home</Button>
    </Box>
  );
}
