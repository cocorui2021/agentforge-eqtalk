from fastapi import APIRouter, UploadFile, File, HTTPException
from utils.ocr_helper import extract_text_from_image_bytes

router = APIRouter()

@router.post("/api/ocr-upload")
async def extract_text_from_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        extracted_text = extract_text_from_image_bytes(content)
        return {"extracted_text": extracted_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR 处理失败：{e}")
