import pytesseract
from PIL import Image
import io

def extract_text_from_image_bytes(image_bytes: bytes, lang: str = "chi_sim+eng") -> str:
    """
    提取图片中的文本内容。

    :param image_bytes: 图片的二进制数据
    :param lang: OCR 语言包，默认中文简体和英文
    :return: 提取的文本字符串
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        extracted_text = pytesseract.image_to_string(image, lang=lang)
        return extracted_text.strip()
    except Exception as e:
        print(f"OCR 处理失败: {e}")
        return "【OCR 识别失败，请上传清晰图片】"
