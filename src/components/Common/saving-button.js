import React from 'react';
import {Button} from 'reactstrap';

const SavingButton = ({
  disabled,
  invalid,
  onClick,
  pristine,
  save = 'Save',
  saving = 'Saving',
  submitting,
  className,
}) => (
  <Button
    color="primary"
    type="submit"
    className={className}
    disabled={pristine || submitting || invalid || disabled}
    {...(onClick ? {onClick} : {})}
  >
    { submitting ?
      <span>{ saving }&nbsp;<div className="loader-spin-3-white ml-2"/></span> :
      save }
  </Button>
);

export default SavingButton;