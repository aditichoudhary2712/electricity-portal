import mysql.connector
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime, timedelta

import random
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import os
import json
import re
import cv2
import easyocr
from werkzeug.utils import secure_filename

app = Flask(__name__)

generated_otp = ""
generated_email = ""

reader = easyocr.Reader(['en'])
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.abspath(
    os.path.join(BASE_DIR, "..", "uploads")
)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
CORS(app)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="aditi2712",
    database="electricity_portal"
)

EMAIL_ADDRESS = "adeeexoxo2005@gmail.com"

# Paste your 16-character Gmail App Password here
EMAIL_PASSWORD = "uygs vgzq fscb ylij"

def verify_aadhaar_format(number):

    number = number.replace(" ", "")

    if re.fullmatch(r"\d{12}", number):
        return 95, "VERIFIED", "Valid Aadhaar Format"

    return 20, "REJECTED", "Invalid Aadhaar Format"
def verify_pan(image_path, form_name, form_pan):

    image = cv2.imread(image_path)

    result = reader.readtext(image)

    detected_text = ""

    for item in result:
        detected_text += item[1] + " "

    print("\nPAN OCR TEXT\n")
    print(detected_text)

    # ---------------- Name ----------------

    form_name = " ".join(form_name.upper().split())
    ocr_text = " ".join(detected_text.upper().split())
    name_match = form_name in ocr_text

    # ---------------- PAN ----------------

    pan_match = re.search(
        r"[A-Z]{5}[0-9]{4}[A-Z]",
        detected_text.upper()
    )

    extracted_pan = ""

    if pan_match:
        extracted_pan = pan_match.group()

    form_pan = form_pan.upper().replace(" ", "")
    extracted_pan = extracted_pan.upper().replace(" ", "")
    pan_verified = (extracted_pan == form_pan)

    print("\n========== PAN DEBUG ==========")
    print("Entered Name      :", form_name)
    print("OCR Text          :", ocr_text)

    print("Entered PAN       :", form_pan)
    print("Extracted PAN     :", extracted_pan)

    print("Name Match        :", name_match)
    print("PAN Match         :", pan_verified)

    print("================================\n")

    

    return {

        "ocr_text": detected_text,

        "name_match": name_match,

        "pan_match": pan_verified,

        "extracted_pan": extracted_pan

    }

def verify_voter(number):

    number = number.upper()

    if re.fullmatch(r"[A-Z]{3}[0-9]{7}", number):
        return 95, "VERIFIED", "Valid Voter ID"

    return 20, "REJECTED", "Invalid Voter ID"

def verify_passport(number):

    number = number.upper()

    if re.fullmatch(r"[A-Z][0-9]{7}", number):
        return 95, "VERIFIED", "Valid Passport"

    return 20, "REJECTED", "Invalid Passport"

def verify_dl(number):

    number = number.upper()

    if re.fullmatch(r"[A-Z]{2}[0-9]{13}", number):
        return 95, "VERIFIED", "Valid Driving License"

    return 20, "REJECTED", "Invalid Driving License"

def verify_ration(number):

    number = number.upper()

    if re.fullmatch(r"[A-Z0-9]{8,20}", number):
        return 90, "VERIFIED", "Valid Ration Card"

    return 20, "REJECTED", "Invalid Ration Card"


def send_status_email(receiver_email, applicant_name, application_id, status):

    try:
        subject = "Electricity Connection Application Status Update"

        body = f"""
Hello {applicant_name},

Your electricity connection application has been updated.

Application ID : {application_id}

Current Status : {status}

Thank you for using the Electricity Connection Portal.

Regards,
Electricity Department
"""

        message = MIMEMultipart()
        message["From"] = EMAIL_ADDRESS
        message["To"] = receiver_email
        message["Subject"] = subject

        message.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        server.sendmail(
            EMAIL_ADDRESS,
            receiver_email,
            message.as_string()
        )

        server.quit()

        print("Email Sent Successfully")

    except Exception as e:
        print("Email Error:", e)


def verify_aadhaar(image_path, form_name, form_aadhaar):

    image = cv2.imread(image_path)

    result = reader.readtext(image)

    detected_text = ""

    for item in result:
        detected_text += item[1] + " "

    print("\nOCR TEXT\n")
    print(detected_text)

    # ---------------- Name ----------------

    name_match = form_name.lower() in detected_text.lower()

    # ---------------- Aadhaar ----------------

    digits = re.findall(r"\d", detected_text)

    extracted_number = "".join(digits)

    aadhaar_match = form_aadhaar in extracted_number

    return {

        "ocr_text": detected_text,

        "name_match": name_match,

        "aadhaar_match": aadhaar_match

    }        


@app.route("/track-status/<application_id>", methods=["GET"])
def track_status(application_id):

    try:
        db.ping(reconnect=True)  
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            "SELECT status FROM applications WHERE application_id = %s",
            (application_id,)
        )

        result = cursor.fetchone()
        cursor.close()

        if result:
            return jsonify({"status": result["status"]})

        return jsonify({"status": "Application Not Found"})

    except Exception as e:
        print("TRACK STATUS ERROR:", e)
        return jsonify({"error": str(e)}), 500
@app.route("/")
def home():
    return "Backend Running"

@app.route("/apply", methods=["POST"])
def apply():
    try:
        db.reconnect()

        identity_file = request.files.get("identityProof")
        profile_file = request.files.get("profilePhoto")

        identity_path = ""
        profile_path = ""

        # ---------------- Save Identity Proof ----------------

        if identity_file:
            identity_filename = secure_filename(identity_file.filename)

            identity_file.save(
                os.path.join(
                    app.config["UPLOAD_FOLDER"],
                    identity_filename
                )
            )

            identity_path = identity_filename

        # ---------------- Save Profile Photo ----------------

        if profile_file:
            profile_filename = secure_filename(profile_file.filename)

            profile_file.save(
                os.path.join(
                    app.config["UPLOAD_FOLDER"],
                    profile_filename
                )
            )

            profile_path = profile_filename

        # ---------------- Get Form Data ----------------

        data = json.loads(request.form["applicationData"])

        document_type = data["documentType"]
        document_number = data["documentNumber"]

        # ---------------- AI Verification ----------------

        if document_type == "Aadhaar Card":

            image_path = os.path.join(
                app.config["UPLOAD_FOLDER"],
                identity_path
            )

            verification = verify_aadhaar(
                image_path,
                data["name"],
                document_number
            )

            if verification["name_match"] and verification["aadhaar_match"]:
                score = 100
                status = "VERIFIED"
                remarks = "Name and Aadhaar matched."

            else:
                score = 20
                status = "REJECTED"
                remarks = "Name or Aadhaar Number does not match."

        elif document_type == "PAN Card":
            image_path = os.path.join(
                app.config["UPLOAD_FOLDER"],
                identity_path
                )
            verification = verify_pan(
                image_path,
                data["name"],
                document_number
    )
            if verification["name_match"] and verification["pan_match"]:
                score = 100
                status = "VERIFIED"
                remarks = "Name and PAN matched."
            else:
                score = 20
                status = "REJECTED"
                remarks = "Name or PAN Number does not match."
        elif document_type == "Voter ID":

            score, status, remarks = verify_voter(document_number)

        elif document_type == "Passport":

            score, status, remarks = verify_passport(document_number)

        elif document_type == "Driving License":

            score, status, remarks = verify_dl(document_number)

        elif document_type == "Ration Card":

            score, status, remarks = verify_ration(document_number)

        else:

            score = 50
            status = "PENDING"
            remarks = "Manual Verification Required"

        # ---------------- Save Application ----------------

        cursor = db.cursor()

        cursor.execute("""
            INSERT INTO applications
            (
                applicant_name,
                gender,
                father_name,
                mobile,
                email,
                house_no,
                street,
                city,
                state_name,
                pincode,
                connection_type,
                supply_type,
                load_requirement,
                phases,
                meter_type,
                document_type,
                identity_proof,
                profile_photo
            )
            VALUES
            (
                %s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,
                %s,%s,%s
            )
        """, (
            data["name"],
            data["gender"],
            data["fatherName"],
            data["mobile"],
            data["email"],
            data["houseNo"],
            data["street"],
            data["city"],
            data["stateName"],
            data["pincode"],
            data["connectionType"],
            data["supplyType"],
            data["loadRequirement"],
            data["phases"],
            data["meterType"],
            document_type,
            identity_path,
            profile_path
        ))

        db.commit()

        new_id = cursor.lastrowid
        application_id = f"APP{new_id:06d}"

        cursor.execute("""
            UPDATE applications
            SET application_id=%s,
                status='Pending'
            WHERE id=%s
        """, (application_id, new_id))

        db.commit()

        # ---------------- Save AI Result ----------------

        cursor.execute("""
            INSERT INTO ai_verification
            (
                application_id,
                document_type,
                ai_score,
                ai_status,
                remarks
            )
            VALUES
            (
                %s,%s,%s,%s,%s
            )
        """, (
            application_id,
            document_type,
            score,
            status,
            remarks
        ))

        db.commit()

        cursor.close()

        return jsonify({
            "message": "Application Saved",
            "applicationId": application_id,
            "ai_status": status,
            "ai_score": score
        })

    except Exception as e:

        print("APPLY ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500

@app.route("/get-districts")
def get_districts():

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
    SELECT district_code, district_name
    FROM district
    ORDER BY district_name
    """)

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)

@app.route("/get-blocks/<int:district_code>")
def get_blocks(district_code):

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
    SELECT block_code, block_name
    FROM block
    WHERE district_code=%s
    ORDER BY block_name
    """, (district_code,))

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)

@app.route("/get-panchayats/<int:block_code>")
def get_panchayats(block_code):

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
    SELECT panchayat_code, panchayat_name
    FROM panchayat
    WHERE block_code=%s
    ORDER BY panchayat_name
    """, (block_code,))

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)

@app.route("/get-villages/<int:panchayat_code>")
def get_villages(panchayat_code):

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
    SELECT village_code, village_name
    FROM village
    WHERE panchayat_code=%s
    ORDER BY village_name
    """, (panchayat_code,))

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)

@app.route("/get-village-details/<int:village_code>")
def get_village_details(village_code):

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
    SELECT
        s.section_name,
        t.tariff_name,
        p.phase_name,
        vm.default_load
    FROM village_mapping vm
    JOIN section s
        ON vm.section_code=s.section_code
    JOIN tariff t
        ON vm.tariff_code=t.tariff_code
    JOIN phase_master p
        ON vm.phase_code=p.phase_code
    WHERE vm.village_code=%s
    """, (village_code,))

    data = cursor.fetchone()

    cursor.close()

    return jsonify(data)
@app.route("/admin/applications")
def admin_applications():

    db.ping(reconnect=True)

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            application_id,
            applicant_name,
            mobile,
            document_type,
            status
        FROM applications
        ORDER BY id DESC
    """)

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)
@app.route("/admin/application/<application_id>")
def admin_application(application_id):

    db.ping(reconnect=True)

    cursor = db.cursor(dictionary=True)
    cursor.execute("""
    SELECT
        a.*,
        ai.ai_score,
        ai.ai_status,
        ai.remarks
    FROM applications a
    LEFT JOIN ai_verification ai
        ON a.application_id = ai.application_id
    WHERE a.application_id = %s
    """, (application_id,))

    data = cursor.fetchone()

    cursor.close()

    return jsonify(data)

@app.route("/admin/dashboard")
def admin_dashboard():

    db.ping(reconnect=True)

    cursor = db.cursor(dictionary=True)

    # Total Applications
    cursor.execute("SELECT COUNT(*) AS total FROM applications")
    total = cursor.fetchone()["total"]

    # Pending
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Pending'
    """)
    pending = cursor.fetchone()["total"]

    # Approved
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Approved'
    """)
    approved = cursor.fetchone()["total"]

    # Rejected
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Rejected'
    """)
    rejected = cursor.fetchone()["total"]

    # Hold
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Hold'
    """)
    hold = cursor.fetchone()["total"]

    # AI Verified
    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM ai_verification
        WHERE ai_status='VERIFIED'
    """)
    verified = cursor.fetchone()["total"]

    cursor.close()

    return jsonify({
        "total": total,
        "pending": pending,
        "approved": approved,
        "rejected": rejected,
        "hold": hold,
        "verified": verified
    })

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/admin/update-status", methods=["POST"])
def update_status():

    data = request.json

    application_id = data["application_id"]
    status = data["status"]

    cursor = db.cursor(dictionary=True)

    # Update application status
    cursor.execute("""
        UPDATE applications
        SET status=%s
        WHERE application_id=%s
    """, (status, application_id))

    db.commit()

    # Get applicant details
    cursor.execute("""
        SELECT
            applicant_name,
            email
        FROM applications
        WHERE application_id=%s
    """, (application_id,))

    applicant = cursor.fetchone()

    if applicant:
        send_status_email(
            applicant["email"],
            applicant["applicant_name"],
            application_id,
            status
        )

    cursor.close()

    return jsonify({
        "message": "Status Updated Successfully"
    })
    

@app.route("/admin/ai-verification")
def ai_verification_logs():

    db.ping(reconnect=True)

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            application_id,
            document_type,
            ai_score,
            ai_status,
            remarks,
            verified_on
        FROM ai_verification
        ORDER BY verified_on DESC
    """)

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)


@app.route("/admin/recent-applications")
def recent_applications():

    db.ping(reconnect=True)

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
    application_id,
    applicant_name,
    mobile,
    status,
    DATE_FORMAT(submitted_at,'%d-%m-%Y') AS submitted_on
FROM applications
ORDER BY id DESC
LIMIT 5
    """)

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)    

@app.route("/admin/application-trend")
def application_trend():

    db.ping(reconnect=True)

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            DATE(submitted_at) AS day,
            COUNT(*) AS total
        FROM applications
        GROUP BY DATE(submitted_at)
        ORDER BY DATE(submitted_at)
    """)

    data = cursor.fetchall()

    cursor.close()

    return jsonify(data)


@app.route("/admin/dashboard-data")
def dashboard_data():

    db.ping(reconnect=True)

    cursor = db.cursor(dictionary=True)

    # ---------------- Dashboard Statistics ----------------

    cursor.execute("SELECT COUNT(*) AS total FROM applications")
    total = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Pending'
    """)
    pending = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Approved'
    """)
    approved = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Rejected'
    """)
    rejected = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM applications
        WHERE status='Hold'
    """)
    hold = cursor.fetchone()["total"]

    cursor.execute("""
        SELECT COUNT(*) AS total
        FROM ai_verification
        WHERE ai_status='VERIFIED'
    """)
    verified = cursor.fetchone()["total"]

    # ---------------- Recent Applications ----------------

    cursor.execute("""
    SELECT
        application_id,
        applicant_name,
        mobile,
        status,
        DATE_FORMAT(submitted_at,'%d-%m-%Y') AS submitted_on
    FROM applications
    ORDER BY id DESC
    LIMIT 5
""")

    recent = cursor.fetchall()

    # ---------------- Trend ----------------

    cursor.execute("""
        SELECT
            DATE(submitted_at) AS day,
            COUNT(*) AS total
        FROM applications
        GROUP BY DATE(submitted_at)
        ORDER BY DATE(submitted_at)
    """)

    dbTrend = cursor.fetchall()

    trend = []

    today = datetime.now().date()

    for i in range(6, -1, -1):

        current_day = today - timedelta(days=i)

        count = 0

        for row in dbTrend:

            if row["day"] == current_day:
                count = row["total"]
                break

        trend.append({
            "day": current_day.strftime("%d %b"),
            "total": count
        })

    cursor.close()

    return jsonify({

        "stats": {
            "total": total,
            "pending": pending,
            "approved": approved,
            "rejected": rejected,
            "hold": hold,
            "verified": verified
        },

        "recentApplications": recent,

        "trendData": trend

    })


@app.route("/send-otp", methods=["POST"])
def send_otp():

    global generated_otp
    global generated_email

    data = request.get_json()
    generated_email = data["email"]
    cursor = db.cursor(dictionary=True)
    cursor.execute(
    "SELECT * FROM users WHERE email=%s",
    (generated_email,)
    )
    user = cursor.fetchone()
    cursor.close()
    if not user:
        return jsonify({
        "message": "Email not registered. Please create an account."
    }), 400
    generated_otp = str(random.randint(100000, 999999))

    subject = "Electricity Portal OTP Verification"

    body = f"""
    Hello,
    Your OTP for Electricity Portal is:
    {generated_otp}
    This OTP is valid for 5 minutes.
    Do not share this OTP with anyone.
    Regards,
    Electricity Portal
    """

    message = MIMEMultipart()
    message["From"] = EMAIL_ADDRESS
    message["To"] = generated_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(
            EMAIL_ADDRESS,
            EMAIL_PASSWORD
        )

        server.send_message(message)

        server.quit()

        return jsonify({
            "message": "OTP sent successfully"
        })

    except Exception as e:

        print(e)

        return jsonify({
            "message": "Unable to send OTP"
        }), 500


@app.route("/verify-otp", methods=["POST"])
def verify_otp():

    global generated_otp
    global generated_email

    data = request.get_json()

    email = data["email"]
    otp = data["otp"]

    if email == generated_email and otp == generated_otp:

        return jsonify({
            "success": True,
            "message": "OTP Verified"
        })

    return jsonify({
        "success": False,
        "message": "Invalid OTP"
    })

@app.route("/register", methods=["POST"])
def register():

    try:

        data = request.get_json()

        cursor = db.cursor()

        cursor.execute("""
        INSERT INTO users
        (
            name,
            mobile,
            email,
            permanent_house_no,
            permanent_street,
            permanent_address_line,
            permanent_city,
            permanent_state,
            permanent_pincode,
            correspondence_house_no,
            correspondence_street,
            correspondence_address_line,
            correspondence_city,
            correspondence_state,
            correspondence_pincode
        )
        VALUES
        (
            %s,%s,%s,
            %s,%s,%s,%s,%s,%s,
            %s,%s,%s,%s,%s,%s
        )
        """, (

            data["name"],
            data["mobile"],
            data["email"],

            data["permanentHouseNo"],
            data["permanentStreet"],
            data["permanentAddressLine"],
            data["permanentCity"],
            data["permanentState"],
            data["permanentPincode"],

            data["correspondenceHouseNo"],
            data["correspondenceStreet"],
            data["correspondenceAddressLine"],
            data["correspondenceCity"],
            data["correspondenceState"],
            data["correspondencePincode"]

        ))

        db.commit()

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Account Created Successfully"
        })

    except Exception as e:

        print(e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    

@app.route("/admin-login", methods=["POST"])
def admin_login():

    data = request.get_json()

    admin_id = data["admin_id"]
    password = data["password"]

    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT * FROM admin
        WHERE admin_id=%s
        AND password=%s
        """,
        (admin_id, password)
    )

    admin = cursor.fetchone()

    cursor.close()

    if admin:

        return jsonify({
            "success": True,
            "message": "Admin Login Successful"
        })

    else:

        return jsonify({
            "success": False,
            "message": "Invalid Admin ID or Password"
        })    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)