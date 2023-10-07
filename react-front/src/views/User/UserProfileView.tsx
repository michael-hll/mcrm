import { Container, Stack, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";
import AppAlert from "../../components/AppAlert/AppAlert";
import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import { useUpdateUser, useUser } from "../../hooks/user";
import useAppStore from "../../store/AppStore";
import { User } from "../../store/interfaces/User";
import { SHARED_CONTROL_PROPS, useAppForm } from "../../utils/form";
import { useNavigate } from "react-router-dom";

const VALIDATE_FORM_EMAIL = {
  email: {
    presence: true,
    email: true,
  }
};

const UserProfileView = () => {

  const currentUser = useAppStore(s => s.currentUser);
  const userQuery = useUser(currentUser ? currentUser.id : -1);
  const userUpdateQuery = useUpdateUser();
  const { formState, onFieldChange, fieldGetError, fieldHasError, isFormValid, setFormState } = useAppForm({
    validationSchema: VALIDATE_FORM_EMAIL,
    initialValues: { ...userQuery.data },
  });
  const navigate = useNavigate();
  if(!currentUser) {
    navigate('/auth', { replace: true });
  }
  // we need this below logic, since when create useAppForm, the initial state is still undefined
  // And react useState only use the first render initial state
  // so we need to reset the state values when we have
  const values = formState.values as User; // Typed alias to formState.values as the "Source of Truth"
  if (Object.keys(values).length === 0 && userQuery.data) {
    setFormState(({
      ...formState,
      values: userQuery.data,
    }));
  }

  const [error, setError] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(true);

  // submit form 
  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      userUpdateQuery.mutate({
        ...values
      });
      setShowError(true);
    }, [userUpdateQuery, values]
  );

  const handleCloseError = useCallback(() => {
    setShowError(false);
    setError('')
  }, []);

  if (userQuery.isLoading) return <p> Loading... </p>;
  if (userUpdateQuery.isLoading) return <p> Loading... </p>;
  
  if (userQuery.isError) {
    console.log('user query error:', userQuery.error);
    if (showError && error !== userQuery.error.message) {
      setError(userQuery.error.message);
    }
  }
  if (userUpdateQuery.isError) {
    if (showError && error !== userUpdateQuery.error.message) {
      setError(userUpdateQuery.error.message);
    }
  }

  return (
    <Container disableGutters sx={{
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
      flexGrow: 1,
    }}>
      <AppForm onSubmit={handleFormSubmit}>
        <Typography gutterBottom variant="h4"
          component="div">
          User Profile
        </Typography>
        <Stack>
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            required
            label="Username"
            name="username"
            disabled={true}
            value={values.username}
            error={fieldHasError('username')}
            helperText={fieldGetError('username') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            required
            label="Email"
            name="email"
            disabled={true}
            value={values.email}
            error={fieldHasError('email')}
            helperText={fieldGetError('email') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            label="Firstname"
            name="firstname"
            value={values.firstname}
            error={fieldHasError('firstname')}
            helperText={fieldGetError('firstname') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            label="Lastname"
            name="lastname"
            value={values.lastname}
            error={fieldHasError('lastname')}
            helperText={fieldGetError('lastname') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            label="Cellphone"
            name="cellphone"
            value={values.cellphone}
            error={fieldHasError('cellphone')}
            helperText={fieldGetError('cellphone') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            label="Phone"
            name="phone"
            value={values.phone}
            error={fieldHasError('phone')}
            helperText={fieldGetError('phone') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            label="Country"
            name="country"
            value={values.country}
            error={fieldHasError('country')}
            helperText={fieldGetError('country') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}

            label="City"
            name="city"
            value={values.city}
            error={fieldHasError('city')}
            helperText={fieldGetError('city') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}

            label="Address 1"
            name="address1"
            value={values.address1}
            error={fieldHasError('address1')}
            helperText={fieldGetError('address1') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}

            label="Address 2"
            name="address2"
            value={values.address2}
            error={fieldHasError('address2')}
            helperText={fieldGetError('address2') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
            label="Zipcode"
            name="zipcode"
            value={values.zipcode}
            error={fieldHasError('zipcode')}
            helperText={fieldGetError('zipcode') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          {error ? (
            <AppAlert severity="error" onClose={handleCloseError}>
              {error}
            </AppAlert>
          ) : null}
          <AppButton type="submit" color="primary" disabled={userUpdateQuery.isLoading}>
            Update
          </AppButton>
        </Stack>
      </AppForm>
    </Container>
  );
};

export default UserProfileView;