import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import validate from "validate.js";
import AppAlert from "../../components/AppAlert/AppAlert";
import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import { useCreateRole } from "../../hooks/role";
import { InitRoleInstance, RoleGrid } from "../../store/interfaces/Role";
import { SHARED_CONTROL_PROPS, useAppForm } from "../../utils/form";

const VALIDATE_FORM = {
  code: {
    presence: true,
    length: { minimum: 2 },
    format: {
      pattern: /^([A-Z])*$/,
      message: function (value: string, attribute: any, validatorOptions: any, attributes: any, globalOptions: any) {
        return validate.format("^Code is not valid. Only capitals letters are allowed.", {
          code: value
        });
      }
    },
  },
  name: {
    presence: true,
    length: { minimum: 2 },
  },
  description: {
    presence: true,
    length: { minimum: 5 },
  },
};

interface CreateRoleViewProps {
  closeDialog?: (isCreateSuccess: boolean) => void;
}

const CreateRoleView = (props: CreateRoleViewProps) => {

  const [error, setError] = useState<string>('');
  const [SubmitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const { formState, onFieldChange, fieldGetError, fieldHasError, setFormState, isFormValid } = useAppForm({
    validationSchema: VALIDATE_FORM,
    initialValues: InitRoleInstance
  });

  const roleCreateQuery = useCreateRole((role) => {
    props.closeDialog?.(true);
  }, (error: AxiosError) => {
    setError((error.response?.data as { message: string }).message);
  });

  const values = formState.values as RoleGrid;
  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      if (!isFormValid()) {
        return;
      }
      setError('');
      setFormState(({
        ...formState,
        touched: {},
      }));
      const { isNew, ...newRole } = values;
      roleCreateQuery.mutate(newRole);
    }, [values, formState, isFormValid, roleCreateQuery, setFormState]
  );

  useEffect(() => {
    if (roleCreateQuery.isLoading || !isFormValid()) {
      setSubmitEnabled(false);
    } else {
      setSubmitEnabled(true);
    }
  }, [roleCreateQuery.isLoading, formState.errors, isFormValid])

  const handleCloseError = useCallback(() => {
    setError('')
  }, []);

  return (
    <Container disableGutters sx={{
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
      flexGrow: 1,
      border: 1,
      borderRadius: '5px',
      borderColor: '#868e96',
      paddingTop: '20px',
      width: '580px',
      height: '495px',
    }}>
      <AppForm onSubmit={handleFormSubmit}>
        <Box sx={{ width: '550px', display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={0} sx={{height: '32px', marginBottom: '20px'}}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5"
                component="div" sx={{
                  textAlign: 'start',
                  margin: '0px 0px 0px 0px'
                }}>
                {`< Create Role >`}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <Box sx={{ width: '400px', height: '350px', boder: 'solid', borderRadius: '5px', paddingTop: '16px' }}>
              <Grid container spacing={0}>
                <Grid item xs={2} />
                <Grid item xs={10}>
                  <TextField
                    sx={{ margin: '0px 0px 0px 0px', width: '200px' }}
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
                <Grid item xs={2} />
                <Grid item xs={10}>
                  <TextField
                    sx={{ margin: '0px 0px 0px 0px', width: '200px', padding: '0px' }}
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
                <Grid item xs={2} />
                <Grid item xs={10}>
                  <TextField
                    sx={{ margin: '0px 0px 0px 0px', width: '300px' }}
                    required
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
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
              </Grid>
            </Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'right', alignSelf: 'flex-end'}}>
            <AppButton variant="contained" onClick={() => props.closeDialog?.(false)} 
              sx={{
              width: '100px',
              marginRight: '8px',
            }}>
              Close
            </AppButton>
            <AppButton
              onKeyDown={ event => {
                if(event.code === 'Enter'){
                  handleFormSubmit(event);
                }
              }}
              disabled={!SubmitEnabled}
              variant="outlined" type="submit" sx={{
                width: '100px',
              }}>
              Save
            </AppButton>
          </Box>
        </Box>
      </AppForm>
    </Container>
  );
}

export default CreateRoleView;
