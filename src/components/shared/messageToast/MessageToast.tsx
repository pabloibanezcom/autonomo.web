import { MessageTitle } from 'interfaces';
import { Alert, AlertTitle, Slide, Snackbar } from 'material';
import { SlideProps } from 'material/interfaces';
import { useDispatch } from 'react-redux';
import { setMessageTitle } from 'store';

type MessageToastProps = {
  messageTitle: MessageTitle;
};

type TransitionProps = Omit<SlideProps, 'direction'>;

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const MessageToast = ({ messageTitle }: MessageToastProps) => {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    dispatch(setMessageTitle(null));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!messageTitle}
      autoHideDuration={3000}
      onClose={handleOnClose}
      TransitionComponent={Transition}
    >
      <Alert severity="success">
        <AlertTitle>{messageTitle?.title || 'Success'}</AlertTitle>
        {messageTitle?.message}
      </Alert>
    </Snackbar>
  );
};

export default MessageToast;
