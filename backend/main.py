
from fastapi import FastAPI
from gpt_reply_api import suggest_replies
from feedback_api import submit_feedback
from role_reply_api import router as role_router

app.include_router(role_router)

app = FastAPI()

app.post("/api/gpt-reply")(suggest_replies)
app.post("/api/feedback")(submit_feedback)
