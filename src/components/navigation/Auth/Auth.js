import React from 'react';
import AuthModal from 'components/modals/AuthModal';
import SignUpModal from 'components/modals/SignupModal';
import PasswordResetModal from 'components/modals/PasswordResetModal';

type PropsType = {
  modalControl: Function,
  snackbarOpen: boolean,
  handleSnackbarClose: Function,

  closeAuthModal: Function,
  authModalOpen: boolean,
  handleSignIn: Function,

  closeSignUpModal: Function,
  signupModalOpen: boolean,
  handleSignUp: Function,

  closePasswordResetModal: Function,
  passwordResetModalOpen: boolean,
  handlePasswordReset: Function,
};

const Auth = (props: PropsType) => (
  <div>
    <AuthModal
      handleClose={props.closeAuthModal}
      isOpen={props.authModalOpen}
      handleCreateRedirect={props.handleCreateRedirect}
      modalControl={props.modalControl}
      onSignIn={props.handleSignIn}
      referrer={props.referrer}
    />

    <SignUpModal
      handleClose={props.closeSignUpModal}
      isOpen={props.signupModalOpen}
      modalControl={props.modalControl}
      onSignUp={props.handleSignUp}
    />

    <PasswordResetModal
      isOpen={props.passwordResetModalOpen}
      modalControl={props.modalControl}
    />
  </div>
);

export default Auth;
