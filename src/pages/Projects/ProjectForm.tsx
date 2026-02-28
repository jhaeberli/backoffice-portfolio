import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { createProject, getProject, updateProject } from '../../api/projects';
import type { Project } from '../../types';

type FormValues = Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & {
  technologiesInput: string;
};

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id!),
    enabled: isEditing,
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      technologiesInput: '',
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description,
        technologiesInput: project.technologies.join(', '),
        githubUrl: project.githubUrl ?? '',
        liveUrl: project.liveUrl ?? '',
        imageUrl: project.imageUrl ?? '',
      });
    }
  }, [project, reset]);

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      navigate('/projects');
    },
  });

  const onSubmit = (values: FormValues) => {
    const technologies = values.technologiesInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const data = {
      title: values.title,
      description: values.description,
      technologies,
      githubUrl: values.githubUrl || undefined,
      liveUrl: values.liveUrl || undefined,
      imageUrl: values.imageUrl || undefined,
    };

    if (isEditing && id) {
      updateMutation.mutate({ id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditing && isLoading) return <CircularProgress />;

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Edit Project' : 'New Project'}
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={3}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="technologiesInput"
              control={control}
              rules={{ required: 'At least one technology is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Technologies (comma-separated)"
                  placeholder="React, TypeScript, Node.js"
                  error={Boolean(errors.technologiesInput)}
                  helperText={errors.technologiesInput?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="githubUrl"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="GitHub URL (optional)" fullWidth />
              )}
            />
            <Controller
              name="liveUrl"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Live URL (optional)" fullWidth />
              )}
            />
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Image URL (optional)" fullWidth />
              )}
            />
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                startIcon={isPending ? <CircularProgress size={16} /> : null}
              >
                {isEditing ? 'Save Changes' : 'Create Project'}
              </Button>
              <Button variant="outlined" onClick={() => navigate('/projects')}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
