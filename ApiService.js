class ApiService {

  static BASE_URL = "http://127.0.0.1:5000";

  static async submitApplication(applicationData, identityProof, profilePhoto) {

    const formData = new FormData();

    formData.append(
        "applicationData",
        JSON.stringify(applicationData)
    );

    if (identityProof) {
        formData.append(
            "identityProof",
            identityProof
        );
    }

    if (profilePhoto) {
        formData.append(
            "profilePhoto",
            profilePhoto
        );
    }

    const response = await fetch(
        `${this.BASE_URL}/apply`,
        {
            method: "POST",
            body: formData
        }
    );

    return await response.json();
}

  static async trackStatus(applicationId) {

    const response = await fetch(
      `${this.BASE_URL}/track-status/${applicationId}`
    );

    return await response.json();
  }
}

export default ApiService;