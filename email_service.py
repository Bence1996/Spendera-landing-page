import os
import httpx
from email_validator import validate_email, EmailNotValidError

# Resend API configuration
RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
RESEND_API_URL = "https://api.resend.com"


def validate_email_format(email: str) -> tuple[bool, str]:
    """
    Validate email format.
    Returns: (is_valid, message)
    """
    try:
        # Normalize and validate
        valid = validate_email(email)
        return True, "Valid"
    except EmailNotValidError as e:
        return False, str(e)


def send_welcome_email(email: str) -> bool:
    """
    Send welcome email to newly registered pre-registration email.
    Returns: True if successful, False otherwise
    """
    if not RESEND_API_KEY:
        print("RESEND_API_KEY not configured - email not sent")
        return False
    
    try:
        client = httpx.Client()
        response = client.post(
            f"{RESEND_API_URL}/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": "noreply@spendera.hu",
                "to": email,
                "subject": "Üdvözlünk a Spendera-ban! 🎉",
                "html": f"""
                <html>
                    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1>Üdvözlünk a Spendera-ban!</h1>
                        <p>Köszönjük az előregisztrációdat, {email}!</p>
                        <p>Az appot hamarosan elérhetővé tesszük a Google Play áruházban. Te az első leszel, aki értesülni fogsz!</p>
                        <p>Addig is, ha van kérdésed vagy ötleted, írj nekünk a hello@spendera.hu címre.</p>
                        <p><strong>Spendera</strong> – Az okos költés korszaka 💰</p>
                    </body>
                </html>
                """,
            },
        )
        client.close()
        return response.status_code in [200, 201]
    except Exception as e:
        print(f"Email send error: {e}")
        return False


def send_notification_to_all(emails: list[str], subject: str, html: str) -> dict:
    """
    Send notification email to all pre-registered users.
    Used when the app is ready to launch.
    Returns: {"sent": int, "failed": int}
    """
    if not RESEND_API_KEY:
        return {"sent": 0, "failed": len(emails)}
    
    result = {"sent": 0, "failed": 0}
    
    try:
        client = httpx.Client()
        for email in emails:
            try:
                response = client.post(
                    f"{RESEND_API_URL}/emails",
                    headers={
                        "Authorization": f"Bearer {RESEND_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "from": "noreply@spendera.hu",
                        "to": email,
                        "subject": subject,
                        "html": html,
                    },
                )
                if response.status_code in [200, 201]:
                    result["sent"] += 1
                else:
                    result["failed"] += 1
            except Exception as e:
                print(f"Failed to send to {email}: {e}")
                result["failed"] += 1
        client.close()
    except Exception as e:
        print(f"Email batch error: {e}")
        result["failed"] = len(emails)
    
    return result
