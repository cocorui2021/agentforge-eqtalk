
from fastapi import FastAPI
from gpt_reply_api import suggest_replies
from feedback_api import submit_feedback

app = FastAPI()

app.post("/api/gpt-reply")(suggest_replies)
app.post("/api/feedback")(submit_feedback)
