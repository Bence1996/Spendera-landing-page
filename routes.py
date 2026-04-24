import os
from pydantic import BaseModel

from fastapi import FastAPI, APIRouter, Request, Depends, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import init_db, get_db, PreRegistration, engine
from email_service import validate_email_format, send_welcome_email


class PreRegisterRequest(BaseModel):
    email: str


class PreRegisterResponse(BaseModel):
    success: bool
    message: str


def create_app(static_dir: str) -> FastAPI:
    # Initialize database
    init_db()
    
    api = APIRouter()

    @api.get("/health")
    def health():
        return {"ok": True}

    @api.post("/pre-register", response_model=PreRegisterResponse)
    def pre_register(request: PreRegisterRequest, db: Session = Depends(get_db)):
        """Register email for pre-launch notification"""
        email = request.email.strip().lower()
        
        # Validate email format
        is_valid, message = validate_email_format(email)
        if not is_valid:
            raise HTTPException(status_code=400, detail=f"Invalid email: {message}")
        
        try:
            # Check if already exists
            existing = db.query(PreRegistration).filter(
                PreRegistration.email == email
            ).first()
            
            if existing:
                return PreRegisterResponse(
                    success=True,
                    message="Already registered"
                )
            
            # Save to database
            pre_reg = PreRegistration(email=email)
            db.add(pre_reg)
            db.commit()
            
            # Send welcome email
            send_welcome_email(email)
            
            return PreRegisterResponse(
                success=True,
                message="Welcome email sent"
            )
        except IntegrityError:
            db.rollback()
            return PreRegisterResponse(
                success=True,
                message="Already registered"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    app = FastAPI()
    app.include_router(api, prefix="/api")

    if os.path.isdir(static_dir):
        assets_dir = os.path.join(static_dir, "assets")
        if os.path.isdir(assets_dir):
            app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

        @app.get("/{path:path}")
        async def spa_fallback(request: Request, path: str):
            file_path = os.path.join(static_dir, path)
            if path and os.path.isfile(file_path):
                return FileResponse(file_path)
            return FileResponse(
                os.path.join(static_dir, "index.html"),
                headers={
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            )

    return app
