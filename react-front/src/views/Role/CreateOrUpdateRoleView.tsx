import { Container, Stack } from "@mui/material";
import AppForm from "../../components/AppForm/AppForm";
import { SyntheticEvent, useCallback, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { SHARED_CONTROL_PROPS, useAppForm } from "../../utils/form";
import { InitRoleInstance, Role } from "../../store/interfaces/Role";
import AppButton from "../../components/AppButton/AppButton";
import CustomSnackbar from "../../components/SnackBarAlert/CustomSnackbar";
import AppAlert from "../../components/AppAlert/AppAlert";


const VALIDATE_FORM_CODE = {
  email: {
    presence: true,
    email: true,
  }
};

const CreateOrUpdateRoleView = () => {

  const [error, setError] = useState<string>('');
  const [SnackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const { formState, onFieldChange, fieldGetError, fieldHasError, setFormState, isFormTouched } = useAppForm({
    validationSchema: VALIDATE_FORM_CODE,
    initialValues: InitRoleInstance
  });

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
    }, []
  );

  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleCloseError = useCallback(() => {
    setError('')
  }, []);

  const values = formState.values as Role;

  return (
    <Container disableGutters sx={{
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
      flexGrow: 1,
    }}>
      <AppForm onSubmit={handleFormSubmit}>
        <Stack sx={{ width: '600px' }}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h4"
                component="div" sx={{
                  textAlign: 'center',
                  padding: '24px 0px'
                }}>
                Create Role
              </Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={8}>
              <TextField
                sx={{ margin: '0px 0px 15px 0px', width: '200px' }}
                required
                label="Code"
                name="code"
                value={values.code}
                error={fieldHasError('code')}
                helperText={fieldGetError('code') || ' '}
                onChange={onFieldChange}
                {...SHARED_CONTROL_PROPS}
              />
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={8}>
              <TextField
                sx={{ margin: '0px 0px 15px 0px', width: '200px' }}
                required
                label="Name"
                name="name"
                value={values.name}
                error={fieldHasError('name')}
                helperText={fieldGetError('name') || ' '}
                onChange={onFieldChange}
                {...SHARED_CONTROL_PROPS}
              />
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={8}>
              <TextField
                sx={{ margin: '0px 0px 15px 0px', width: '300px' }}
                required
                label="Description"
                name="description"
                multiline
                rows={4}
                value={values.description}
                error={fieldHasError('description')}
                helperText={fieldGetError('description') || ' '}
                onChange={onFieldChange}
                {...SHARED_CONTROL_PROPS}
              />
            </Grid>
            <Grid item xs={12}>
            {error ? (
              <AppAlert severity="error" onClose={handleCloseError}>
                {error}
              </AppAlert>
            ) : null}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={8}>
              <AppButton type="submit" color="primary" sx={{
                width: '200px',
              }}>
                Update
              </AppButton>
            </Grid>
            <Grid item xs={12}>
            <CustomSnackbar
              open={SnackBarOpen}
              onClose={handleSnackClose}
              message={'Update user profile success!'} />
            </Grid>
          </Grid>
        </Stack>
      </AppForm>
    </Container>
  );
}

export default CreateOrUpdateRoleView;
