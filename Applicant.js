class Applicant {
  constructor(data) {
    this.name = data.name;
    this.fatherName = data.fatherName;
    this.mobile = data.mobile;
    this.email = data.email;
    this.gender = data.gender;
  }

  getData() {
    return {
      name: this.name,
      fatherName: this.fatherName,
      mobile: this.mobile,
      email: this.email,
      gender: this.gender
    };
  }
}

export default Applicant;