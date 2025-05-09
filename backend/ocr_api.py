from fastapi import APIRouter, UploadFile, File, HTTPException
import pytesseract
from PIL import Image
import io

router = APIRouter()

@router.post("/api/ocr-upload")
async def extract_text_from_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        extracted_text = pytesseract.image_to_string(image, lang='chi_sim+eng')
        return {"extracted_text": extracted_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR 处理失败：{e}")
