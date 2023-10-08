import { Box, Container, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import AppAlert from "../../components/AppAlert/AppAlert";
import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import CustomSnackbar from "../../components/SnackBarAlert/CustomSnackbar";
import { useUpdateUser, useUser } from "../../hooks/user";
import { InitUserInstance, User } from "../../store/interfaces/User";
import { SHARED_CONTROL_PROPS, useAppForm } from "../../utils/form";
import useAppStore from "../../store/AppStore";
import { RefreshCheck } from "../../utils/localStorage";

const VALIDATE_FORM_EMAIL = {
  email: {
    presence: true,
    email: true,
  }
};

const UserProfileView = () => {

  let store = useAppStore();
  const [error, setError] = useState<string>('');
  const [SnackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [SubmitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const { formState, onFieldChange, fieldGetError, fieldHasError, setFormState, isFormTouched } = useAppForm({
    validationSchema: VALIDATE_FORM_EMAIL,
    initialValues: InitUserInstance
  });

  useEffect(() => {
    RefreshCheck(store);
  }, [store]);

  useEffect(() => {
    if(isFormTouched()){
      setSubmitEnabled(true);
    }
  }, [isFormTouched]);

  const userQuery = useUser(store.currentUser, (data) => {
    setFormState(({
      ...formState,
      values: data,
    }));
  }, (error) => {
    setError(error.message);
  });

  const userUpdateQuery = useUpdateUser((user) => {
    setSnackBarOpen(true);
    setSubmitEnabled(false);
    setFormState(({
      ...formState,
      touched: {},
    }));
  }, (error) => {
    setError(error.message);
  });

  const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };
  const values = formState.values as User;
  // submit form 
  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      setSubmitEnabled(false);
      userUpdateQuery.mutate(values);
    }, [userUpdateQuery, values]
  );

  const handleCloseError = useCallback(() => {
    setError('')
  }, []);

  return (
    <Container disableGutters sx={{
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
      flexGrow: 1,
    }}>
      <AppForm onSubmit={handleFormSubmit}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr * 6',
          justifySelf: 'stretch',
        }}>
          {/* Row 1 */}
          <Box sx={{
            display: 'flex',
            gridColumnStart: '1',
            gridColumnEnd: 'span 6',
            justifyContent: 'center',
            padding: '24px 0px'
          }}>
            <Typography gutterBottom variant="h4"
              component="div" sx={{
                alignSelf: 'center',
              }}>
              Update Profile
            </Typography>
          </Box>
          {/* Row 2 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 3',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
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
          </Box>
          <Box sx={{
            gridColumnStart: '4',
            gridColumnEnd: 'span 3',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
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
          </Box>
          {/* Row 3 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 3',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
              label="Firstname"
              name="firstname"
              value={values.firstname}
              error={fieldHasError('firstname')}
              helperText={fieldGetError('firstname') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          <Box sx={{
            gridColumnStart: '4',
            gridColumnEnd: 'span 3',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
              label="Lastname"
              name="lastname"
              value={values.lastname}
              error={fieldHasError('lastname')}
              helperText={fieldGetError('lastname') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          {/* Row 4 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 3',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
              label="Cellphone"
              name="cellphone"
              value={values.cellphone}
              error={fieldHasError('cellphone')}
              helperText={fieldGetError('cellphone') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          <Box sx={{
            gridColumnStart: '4',
            gridColumnEnd: 'span 3',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
              label="Phone"
              name="phone"
              value={values.phone}
              error={fieldHasError('phone')}
              helperText={fieldGetError('phone') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          {/* Row 5 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 2',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
              label="Country"
              name="country"
              value={values.country}
              error={fieldHasError('country')}
              helperText={fieldGetError('country') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          <Box sx={{
            gridColumnStart: '3',
            gridColumnEnd: 'span 2',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
              label="City"
              name="city"
              value={values.city}
              error={fieldHasError('city')}
              helperText={fieldGetError('city') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          <Box sx={{
            gridColumnStart: '5',
            gridColumnEnd: 'span 2',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}
              label="Zipcode"
              name="zipcode"
              value={values.zipcode}
              error={fieldHasError('zipcode')}
              helperText={fieldGetError('zipcode') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          {/* Row 6 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 6',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}

              label="Address 1"
              name="address1"
              value={values.address1}
              error={fieldHasError('address1')}
              helperText={fieldGetError('address1') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          {/* Row 7 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 6',
            paddingRight: '16px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px' }}

              label="Address 2"
              name="address2"
              value={values.address2}
              error={fieldHasError('address2')}
              helperText={fieldGetError('address2') || ' '}
              onChange={onFieldChange}
              {...SHARED_CONTROL_PROPS}
            />
          </Box>
          {/* Row 8 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 6',
            paddingRight: '16px',
          }}>
            {error ? (
              <AppAlert severity="error" onClose={handleCloseError}>
                {error}
              </AppAlert>
            ) : null}
          </Box>
          {/* Row 9 */}
          <Box sx={{
            display: 'flex',
            gridColumnStart: '1',
            gridColumnEnd: 'span 6',
            justifyContent: 'center',
            paddingRight: '16px',
          }}>
            <AppButton type="submit" color="primary" disabled={!SubmitEnabled || userQuery.isLoading} sx={{
              width: '200px',
            }}>
              Update
            </AppButton>
          </Box>
          {/* Row 10 */}
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 6',
            paddingRight: '16px',
          }}>
            <CustomSnackbar
              open={SnackBarOpen}
              onClose={handleSnackClose}
              message={'Update user profile success!'} />
          </Box>

        </Box>
      </AppForm>
    </Container>
  );
};

export default UserProfileView;