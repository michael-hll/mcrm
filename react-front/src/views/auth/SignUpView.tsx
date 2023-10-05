import { SyntheticEvent, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  LinearProgress,
  Container,
  Box,
  CardMedia,
  Typography,
} from '@mui/material';
import { SHARED_CONTROL_PROPS, eventPreventDefault, useAppForm } from '../../utils/form';
import AppForm from '../../components/AppForm/AppForm';
import AppIconButton from '../../components/AppIconButton/AppIconButton';
import AppAlert from '../../components/AppAlert/AppAlert';
import AppButton from '../../components/AppButton/AppButton';
import { signUp } from '../../services/auth/auth.service';

const VALIDATE_FORM_SIGNUP = {
  username: {
    type: 'string',
    presence: { allowEmpty: false },
    format: {
      pattern: '^[A-Za-z._0-9 ]+$',
      message: 'should contain only alphabets',
    },
  },
  email: {
    email: true,
    presence: true,
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

const VALIDATE_EXTENSION = {
  confirmPassword: {
    equality: 'password',
  },
};

interface FormStateValues {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

/**
 * Renders "Signup" view
 * url: /auth/signup
 * @page Signup
 */
const SignUpView = () => {
  const navigate = useNavigate();
  const [validationSchema, setValidationSchema] = useState<any>({
    ...VALIDATE_FORM_SIGNUP,
    ...VALIDATE_EXTENSION,
  });
  const { formState, onFieldChange, fieldGetError, fieldHasError, isFormValid } = useAppForm({
    validationSchema: validationSchema, // the state value, so could be changed in time
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    } as FormStateValues,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const values = formState.values as FormStateValues; // Typed alias to formState.values as the "Source of Truth"

  useEffect(() => {
    // Component Mount
    let componentMounted = true;

    async function fetchData() {
      //TODO: Call any Async API here
      if (!componentMounted) return; // Component was unmounted during the API call
      //TODO: Verify API call here

      setLoading(false); // Reset "Loading..." indicator
    }
    fetchData(); // Call API asynchronously

    return () => {
      // Component Un-mount
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    // Update Validation Schema when Show/Hide password changed
    let newSchema;
    if (showPassword) {
      newSchema = VALIDATE_FORM_SIGNUP; // Validation without .confirmPassword
    } else {
      newSchema = { ...VALIDATE_FORM_SIGNUP, ...VALIDATE_EXTENSION }; // Full validation
    }
    setValidationSchema(newSchema);
  }, [showPassword]);

  const handleShowPasswordClick = useCallback(() => {
    setShowPassword((oldValue) => !oldValue);
  }, []);

  const handleAgreeClick = useCallback(() => {
    setAgree((oldValue) => !oldValue);
  }, []);

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      signUp(values.username, values.email, values.password)
        .then((response) => {
          return navigate('/auth', { replace: true });
        }).catch(err => {
          setError('Can not create user for given email, if you already have account please sign in');
          return; // Unsuccessful signup
        })
    },
    [values, navigate]
  );

  const handleCloseError = useCallback(() => setError(undefined), []);

  if (loading) return <LinearProgress />;

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
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
                Sign Up
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
                label="User Name"
                name="username"
                value={values.username}
                error={fieldHasError('username')}
                helperText={fieldGetError('username') || ' '}
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
              {!showPassword && (
                <TextField
                  sx={{ margin: '0px 0px 15px 0px', width: '470px' }}
                  required
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  error={fieldHasError('confirmPassword')}
                  helperText={fieldGetError('confirmPassword') || ' '}
                  onChange={onFieldChange}
                  {...SHARED_CONTROL_PROPS}
                />
              )}
              <FormControlLabel
                control={<Checkbox required name="agree" checked={agree} onChange={handleAgreeClick} />}
                label="You must agree with Terms of Use and Privacy Policy"
              />

              {error ? (
                <AppAlert severity="error" onClose={handleCloseError}>
                  {error}
                </AppAlert>
              ) : null}

              <Grid container justifyContent="center" alignItems="center">
                <AppButton type="submit" disabled={!(isFormValid() && agree)}>
                  Confirm and Sign Up
                </AppButton>
              </Grid>
            </CardContent>
          </Card>
        </AppForm>
      </Box>
    </Container >
  );
};

export default SignUpView;
