# Agricultural-Chatbot

1. Project Overview
The project involves:

Next.js frontend for user interactions in Malayalam and English.
FastAPI backend for serving a fine-tuned LLaMA-based model.
The "unsloth/Llama-3.2-1B-Instruct" has been fine-tuned using QLoRA, quantized into GGUF, and integrated into the backend for inference.
2. Steps to Run the Project
Frontend (Next.js)
Navigate to the Frontend Directory:

cd my-app
Start the Development Server:

npm run dev
The application will be available on http://localhost:3000.

Backend (FastAPI)
Navigate to the Server Directory:

cd server
Activate Virtual Environment:

venv\Scripts\activate
If the virtual environment fails, use the fallback:

python -m venv venv

Install Dependencies:mentioned in requirements.txt
Start the Backend Server:

uvicorn malayalam:app --reload
Use this as a fallback:
python -m uvicorn malayalam:app --reload
The FastAPI server will be running on http://localhost:8000.

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1evmt1D0D3lt3VnmV2mWqlg-r-c_D4p6p#scrollTo=71QefF0A2hQe)



 

