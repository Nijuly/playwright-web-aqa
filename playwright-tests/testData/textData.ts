export enum Text {
  EMAIL_PLACEHOLDER = "Email",
  PASSWORD_PLACEHOLDER = "Enter a password",
  GO_TO_HISTORY = "Go to upload history, files uploaded: ",
  DRAG_AND_DROP = "Drag 'n' drop PDF files here,or click to select files",
  CONVERT_PDF_FILE = "Convert PDF file",
  ITEMS_HISTORY = "Items History",
  BACK_TO_CONVERT = "Back to convert",
  CLEAR_ALL_ENTRIES = "Clear all entries",
  ALERT_EMPY_FIELD_MESSAGE = "No empty fields allowed!",
  ALERT_INCORRECT_CREDENTIALS_MESSAGE = "Email or password is incorrect",
  ALER_PASSWORD_FOR_ANOTHER_USER = 'Provided password is for the user "user25@example.com". Use another one.',
  ALERT_INVALID_PASSWORD = "This is an invalid password for this email",
  OH_NO = "Oh, no! :(",
  ALERT_FILE_TOO_LARGE = "File is too large",
  ALERT_FILE_EMPTY = "File is empty",
  ALERT_FILE_CORRUPTED = "File is corrupted",
  ALERT_INVALID_FILE_FORMAT = "Invalid file format",
  ALERT_PDF_ONLY = "No-no-no! PDF only!",
  ALERT_SUCCESS = "File converted successfully!",
}

export const errorMessage = [
  Text.ALERT_EMPY_FIELD_MESSAGE,
  Text.ALERT_INCORRECT_CREDENTIALS_MESSAGE,
  Text.ALER_PASSWORD_FOR_ANOTHER_USER,
  Text.OH_NO,
  Text.ALERT_INVALID_PASSWORD,
];
