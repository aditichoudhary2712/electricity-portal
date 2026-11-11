class Address {
  constructor(data) {
    this.houseNo = data.houseNo;
    this.street = data.street;
    this.city = data.city;
    this.stateName = data.stateName;
    this.pincode = data.pincode;
  }

  getData() {
    return {
      houseNo: this.houseNo,
      street: this.street,
      city: this.city,
      stateName: this.stateName,
      pincode: this.pincode
    };
  }
}

export default Address;