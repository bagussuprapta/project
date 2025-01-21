import { ResponseError } from "../errors/responseError.js";

function formatErrorMessage(errorMessage) {
  return errorMessage.replace(/\"/g, "").replace(/_/g, " ");
}

const validator = (schema, request) => {
  const result = schema.validate(request, {
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, formatErrorMessage(result.error.message));
  } else {
    return result.value;
  }
};

export { validator };
