import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useCallback, useRef, useState } from "react";
import AppForm from "../../components/AppForm/AppForm";
import { useUpdateUser, useUser } from "../../hooks/user";
import useAppStore from "../../store/AppStore";
import AppButton from "../../components/AppButton/AppButton";
import { SHARED_CONTROL_PROPS, useAppForm } from "../../utils/form";
import { User } from "../../store/interfaces/User";
import AppAlert from "../../components/AppAlert/AppAlert";

const VALIDATE_FORM_EMAIL = {
  email: {
    presence: true,
    email: true,
  }
};

const UserProfileView = () => {

  const currentUser = useAppStore(s => s.currentUser);
  const userQuery = useUser(currentUser ? currentUser.id : -1);
  const user = userQuery.data;
  const userUpdateQuery = useUpdateUser();
  const { formState, onFieldChange, fieldGetError, fieldHasError, isFormValid, setFormState } = useAppForm({
    validationSchema: VALIDATE_FORM_EMAIL,
    initialValues: { ...{email:'admin@test.com'} },
  });

  const values = formState.values as User; // Typed alias to formState.values as the "Source of Truth"
  const [error, setError] = useState<string>();

  // submit form 
  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      userUpdateQuery.mutate({
        ...values
      });
    }, [userUpdateQuery, values]
  );

  const handleCloseError = useCallback(() => setError(undefined), []);

  if (userQuery.isLoading) return <p> Loading... </p>;
  if (userQuery.isError) return <p>{JSON.stringify(userQuery.error)}</p>;
  
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
            Save
          </AppButton>
        </Stack>
      </AppForm>
    </Container>
  );
};

export default UserProfileView;