import { IntlTypography } from 'components/shared';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from 'material';
import React, { useState } from 'react';

type DeleteDialogProps = {
  title: string;
  question: string;
  name: string;
  deleteButtonLabel?: string;
  open: boolean;
  onClose?: () => void;
  onDelete: () => void;
};

const DeleteDialog = ({
  title,
  question,
  name,
  deleteButtonLabel,
  open,
  onClose,
  onDelete
}: DeleteDialogProps) => {
  const [matchInput, setMatchInput] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatchInput(e.target.value === name);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <IntlTypography id={title} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <IntlTypography id={question} values={{ name }} />
        </DialogContentText>
        <TextField
          id={new Date().valueOf().toString()}
          autoFocus
          fullWidth
          className="mt-4"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button color="error" disabled={!matchInput} onClick={onDelete}>
          <IntlTypography id={deleteButtonLabel} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
