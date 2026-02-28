import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject, getProjects } from '../../api/projects';
import type { Project } from '../../types';

export default function Projects() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setDeleteTarget(null);
    },
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Failed to load projects.</Alert>;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/projects/new')}
        >
          Add Project
        </Button>
      </Stack>

      {projects && projects.length === 0 && (
        <Typography color="text.secondary">No projects yet. Add your first one!</Typography>
      )}

      <Stack spacing={2}>
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardContent>
              <Typography variant="h6">{project.title}</Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {project.description}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {project.technologies.map((tech) => (
                  <Chip key={tech} label={tech} size="small" />
                ))}
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/projects/${project.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteTarget(project)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {/* Delete confirmation dialog */}
      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            disabled={deleteMutation.isPending}
            onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
