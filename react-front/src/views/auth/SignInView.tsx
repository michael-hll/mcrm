import { Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import AppForm from "../../components/AppForm/AppForm";
import AppButton from "../../components/AppButton/AppButton";
import AppLink from "../../components/AppLink/AppLink";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, SyntheticEvent } from "react";
import { SHARED_CONTROL_PROPS, eventPreventDefault, useAppForm } from "../../utils/form";
import AppIconButton from "../../components/AppIconButton/AppIconButton";
import AppAlert from "../../components/AppAlert/AppAlert";
import useAppStore from "../../store/AppStore";
import { signIn } from "../../services/auth/auth.service";
import { MCRM_ACCESS_TOKEN_KEY, MCRM_REFRESH_TOKEN_KEY } from "../../services/app.constants";

const VALIDATE_FORM_LOGIN_EMAIL = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      maximum: 32,
      message: 'must be between 8 and 32 characters',
    },
  },
};

interface FormStateValues {
  email: string;
  password: string;
}

const SignInView = () => {

  const appStore = useAppStore();
  const navigate = useNavigate();
  const { formState, onFieldChange, fieldGetError, fieldHasError, isFormValid } = useAppForm({
    validationSchema: VALIDATE_FORM_LOGIN_EMAIL,
    initialValues: { email: '', password: '' } as FormStateValues,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>();
  const values = formState.values as FormStateValues; // Typed alias to formState.values as the "Source of Truth"

  const handleShowPasswordClick = useCallback(() => {
    setShowPassword((oldValue) => !oldValue);
  }, []);

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      signIn(values.email, values.password)
        .then(data => {
          appStore.set({
            currentUser:
            {
              email: values.email,
              username: data.username
            },
            isAuthenticated: true
          })
          localStorage.setItem(MCRM_ACCESS_TOKEN_KEY, data.accessToken);
          localStorage.setItem(MCRM_REFRESH_TOKEN_KEY, data.refreshToken);
          navigate('/', { replace: true });
        }).catch(
          err => {
            setError('Please check email and password.' + err.message ? err.message : '');
            return;
          });
    },
    [appStore, values, navigate]
  );

  const handleCloseError = useCallback(() => setError(undefined), []);

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '95vh'
      }}>
        <AppForm onSubmit={handleFormSubmit}>
          <Card sx={{ maxWidth: 500 }}>
            <CardMedia
              sx={{ height: 200 }}
              image="/images/cat.jpeg"
            />
            <CardContent>
              <Typography gutterBottom variant="h4"
                component="div"
                sx={{
                  textAlign: 'left',
                  margin: '0px 0px 20px 10px',
                  padding: '0px',
                }}>
                Login
              </Typography>
              <TextField
                sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
                required
                label="Email"
                name="email"
                value={values.email}
                error={fieldHasError('email')}
                helperText={fieldGetError('email') || ' '}
                onChange={onFieldChange}
                {...SHARED_CONTROL_PROPS}
              />
              <TextField
                sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
                required
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                value={values.password}
                error={fieldHasError('password')}
                helperText={fieldGetError('password') || ' '}
                onChange={onFieldChange}
                {...SHARED_CONTROL_PROPS}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AppIconButton
                        aria-label="toggle password visibility"
                        icon={showPassword ? 'visibilityon' : 'visibilityoff'}
                        title={showPassword ? 'Hide Password' : 'Show Password'}
                        onClick={handleShowPasswordClick}
                        onMouseDown={eventPreventDefault}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {error ? (
                <AppAlert severity="error" onClose={handleCloseError}>
                  {error}
                </AppAlert>
              ) : null}
              <Grid container justifyContent="center" alignItems="center">
                <AppButton type="submit" color="primary" disabled={!isFormValid()}>
                  Login with Email
                </AppButton>
                <Button variant="text" color="primary" component={AppLink} to="/auth/signup">
                  Sign Up?
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </AppForm>
      </Box>
    </Container>
  );
};

export default SignInView;
