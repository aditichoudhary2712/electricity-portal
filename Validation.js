class Validation {

  static validateMobile(mobile) {
    return /^\d{10}$/.test(mobile);
  }

  static validatePincode(pincode) {
    return /^\d{6}$/.test(pincode);
  }

}

export default Validation;