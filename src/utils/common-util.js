import { PAY_CREDIT_CARD, PAY_ON_DELIVER } from "@/constants/payment-methods";
import { fTimestamp } from "./format-time";

/**
 * Returns true if a value is undefined
 * @param value
 * @returns {boolean}
 */
const isUndefinedOrNull = (value) => {
  return typeof value === "undefined" || value === null;
};

/**
 * Rounds a number to the provided no. of decimal places
 *
 * @param value Number to be rounded
 * @param decimalPlaces No. of decimal places. By default it's 2
 * @return {number} Rounded Number
 */
const roundNumber = (value, decimalPlaces = 2) => {
  if (isNaN(value)) return 0;
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round((value + Number.EPSILON) * factorOfTen) / factorOfTen;
};

/**
 * Checks if String is empty or contains white spaces
 *
 * @param string String
 * @return {boolean}
 */
const stringIsEmptyOrSpaces = (string) => {
  string = string.toString();
  return isUndefinedOrNull(string) || string.match(/^ *$/) !== null;
};

const calculateDiscountPrice = (discount, baseprice) => {
  const discountPerc = 100 - discount;
  return (discountPerc * baseprice) / 100;
};

const validateFormik = (formik) => {
  const fieldsToValidateAndTouch = Object.keys(formik.initialValues);

  // Validate the form
  formik.validateForm().then(() => {
    // Set touched for the specified fields
    const touchedFields = {};
    fieldsToValidateAndTouch.forEach((field) => {
      touchedFields[field] = true;
    });
    formik.setTouched(touchedFields);
  });
};

const createImgFileName = (color, originalFile) => {
  const fileType = originalFile.name.substring(
    originalFile.name.lastIndexOf(".") + 1
  );
  const newFileName = `${color
    .toLowerCase()
    .replace(/\s+/g, "")}-${fTimestamp()}.${fileType}`;

  return new File([originalFile], newFileName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
};

const blobToFile = (blob, fileName, originalFileType = "image/jpeg") => {
  // Create a File object from the Blob
  return new File([blob], fileName, { type: originalFileType });
};

const getPaymentMethodString = (method) => {
  switch (method) {
    case PAY_CREDIT_CARD:
      return "Visa/Master";
    case PAY_ON_DELIVER:
      return "COD";
    default:
      return "-";
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  isUndefinedOrNull,
  roundNumber,
  stringIsEmptyOrSpaces,
  calculateDiscountPrice,
  validateFormik,
  createImgFileName,
  blobToFile,
  getPaymentMethodString
};
