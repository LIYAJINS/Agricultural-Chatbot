from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_community.llms import LlamaCpp
from fastapi.middleware.cors import CORSMiddleware


# Initialize FastAPI app
app = FastAPI()

# Allow CORS for the Next.js frontend (localhost:3000)
origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows CORS from this origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Load the GGML model
model_path = r"C:\Users\DELL\Downloads\Final\ggml-model-q4_k_m.gguf"
llm = LlamaCpp(model_path=model_path)

# Request model schema
class PromptRequest(BaseModel):
    prompt: str

# GET endpoint
@app.get("/")
async def read_root():
    return {
        "message": "Welcome to the Llama Model API. Use the /ask endpoint with a POST request to interact with the model.",
       
    }

@app.post("/ask")
async def ask_model(request: PromptRequest):
    user_input = request.prompt
    try:
        response = llm(user_input)
        # Clean the response if it's a string
        if isinstance(response, str):
            clean_response = response.strip().replace("\n", " ").replace("\r", "")
            return {"response": clean_response}
        elif isinstance(response, dict) and 'text' in response:
            clean_response = response['text'].strip().replace("\n", " ").replace("\r", "")
            return {"response": clean_response}
        else:
            raise ValueError("Unexpected response format from the model.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model inference failed: {str(e)}")

# User input schema for /submit endpoint
class UserInput(BaseModel):
    questions: str  # User question in Malayalam or English
    output: str

# Endpoint to handle user input
@app.post("/submit")
async def submit_user_input(user_input: UserInput):
    return {"message": f"Received input: {user_input.questions}, {user_input.output}"}

# Handle favicon requests
@app.get("/favicon.ico")
async def favicon():
    return {"message": "Favicon not available"}
