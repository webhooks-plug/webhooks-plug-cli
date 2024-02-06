import ora from "ora";

const spinner = ora();

const updateSpinnerText = (message: string) => {
  if (spinner.isSpinning) {
    spinner.text = message;
    return;
  }

  spinner.start(message);
};

const stopSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop();
  }
};

const spinnerError = (message: string) => {
  if (spinner.isSpinning) {
    spinner.fail(message);
  }
};

const spinnerSuccess = (message: string) => {
  if (spinner.isSpinning) {
    spinner.succeed(message);
  }
};

const spinnerInfo = (message: string) => {
  spinner.info(message);
};

export {
  updateSpinnerText,
  stopSpinner,
  spinnerError,
  spinnerSuccess,
  spinnerInfo,
};
