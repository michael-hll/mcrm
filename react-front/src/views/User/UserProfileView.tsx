import { Box, Container, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppAlert from "../../components/AppAlert/AppAlert";
import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import CustomSnackbar from "../../components/SnackBarAlert/CustomSnackbar";
import { useUpdateUser, useUser } from "../../hooks/user";
import useAppStore from "../../store/AppStore";
import { InitUserInstance, User } from "../../store/interfaces/User";
import { SHARED_CONTROL_PROPS, useAppForm } from "../../utils/form";

const VALIDATE_FORM_EMAIL = {
  email: {
    presence: true,
    email: true,
  }
};

const UserProfileView = () => {

  const [error, setError] = useState<string>('');
  const { formState, onFieldChange, fieldGetError, fieldHasError, setFormState } = useAppForm({
    validationSchema: VALIDATE_FORM_EMAIL,
    initialValues: InitUserInstance
  });
  const currentUser = useAppStore(s => s.currentUser);
  
  const userQuery = useUser(currentUser, (data) => {
    setFormState(({
      ...formState,
      values: data,
    }));
  }, (error) => {
    setError(error.message);
  });
  const [SnackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const userUpdateQuery = useUpdateUser((user) => {
    setSnackBarOpen(true);
  }, (error) => {
    setError(error.message);
  });

  const navigate = useNavigate();
  if (!currentUser) {
    navigate('/auth', { replace: true });
  }

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
      userUpdateQuery.mutate(values);
    }, [userUpdateQuery, values]
  );

  const handleCloseError = useCallback(() => {
    setError('')
  }, []);

  if (userQuery.isLoading) return <p> Loading... </p>;
  if (userUpdateQuery.isLoading) return <p> Loading... </p>;

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
            padding: '20px 0px'       
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
          }}>
            <TextField
              sx={{ margin: '0px 0px 15px 0px'}}
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
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
            paddingRight: '15px',
          }}>
            <AppButton type="submit" color="primary" disabled={userUpdateQuery.isLoading} sx={{
              width: '200px',
            }}>
              Update
            </AppButton>
          </Box>
          {/* Row 10 */} 
          <Box sx={{
            gridColumnStart: '1',
            gridColumnEnd: 'span 6',
            paddingRight: '15px',
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