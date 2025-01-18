export const authFormConfig: any = {
  login: [
    {
      label: 'Email',
      type: 'email',
      control: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      type: 'password',
      control: 'password',
      placeholder: 'Enter your password',
    },
  ],
  register: [
    {
      label: 'First name',
      type: 'text',
      control: 'first_name',
      placeholder: 'Enter your first name',
    },
    {
      label: 'Last name',
      type: 'text',
      control: 'last_name',
      placeholder: 'Enter your last name',
    },
    {
      label: 'Email',
      type: 'email',
      control: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'Role',
      type: 'text',
      control: 'role',
      placeholder: 'Enter your role',
    },
    {
      label: 'Password',
      type: 'password',
      control: 'password',
      placeholder: 'Enter your password',
    },
  ],
  resetRequestPassword: [
    {
      label: 'Email',
      type: 'email',
      control: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'OTP',
      type: 'text',
      control: 'otp',
      placeholder: 'Enter OTP',
    },
    {
      label: 'Password',
      type: 'password',
      control: 'password',
      placeholder: 'Enter your password',
    },
  ],
  resetPassword: [
    {
      label: 'Email',
      type: 'email',
      control: 'email',
      placeholder: 'Enter your email',
    },
  ],
  changePassword: [
    {
      label: 'Old password',
      type: 'password',
      control: 'password',
      placeholder: 'Enter old password',
    },
    {
      label: 'New password',
      type: 'password',
      control: 'newPassword',
      placeholder: 'Enter new password',
    },
    {
      label: 'Confirm new password',
      type: 'password',
      control: 'confirmNewPassword',
      placeholder: 'Confirm new password',
    },
  ],
};
