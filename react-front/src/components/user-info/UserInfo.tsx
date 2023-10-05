import { Avatar, Stack, Typography } from '@mui/material';
import AppLink from '../app-link/AppLink';
import { User } from '../../store/interfaces/User';

interface UserInfoProps {
  className?: string;
  showAvatar?: boolean;
  user?: User;
}

/**
 * Renders User info with Avatar
 * @component UserInfo
 * @param {string} [className] - optional className for <div> tag
 * @param {boolean} [showAvatar] - user's avatar picture is shown when true
 * @param {object} [user] - logged user data {name, email, avatar...}
 */
const UserInfo = ({ className, showAvatar = false, user, ...restOfProps }: UserInfoProps) => {
  const fullName = user?.username
  const srcAvatar = user?.username.substring(0,1);
  const userPhoneOrEmail = user?.email;

  return (
    <Stack alignItems="center" minHeight="fit-content" marginBottom={2} {...restOfProps}>
      {showAvatar ? (
        <AppLink to="/user" underline="none">
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: '3rem',
            }}
            alt={fullName || 'User Avatar'}
            src={srcAvatar}
          />
        </AppLink>
      ) : null}
      <Typography sx={{ mt: 1 }} variant="h6">
        {fullName || 'Current User'}
      </Typography>
      <Typography variant="body2">{userPhoneOrEmail || 'Loading...'}</Typography>
    </Stack>
  );
};

export default UserInfo;
