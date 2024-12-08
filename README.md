# Agricultural-Chatbot
Topic:-Creating a Multi-language (Malayalam) Chatbot for Agricultural Crop Information Using Next.js Frontend and FastAPI Backend with Custom Fine-tuned Quantized LLM

Install Required Libraries: installing various libraries such as accelerate, peft, bitsandbytes, transformers, trl, and llama-cpp-python, which are necessary for model training, quantization, and handling datasets.

Import Libraries:  imports several libraries to support model training, tokenizer handling, and dataset processing, such as torch, transformers, datasets, and peft for low-rank adaptation (LoRA).

Load Dataset: loads an Excel file (/content/outputmalayalam.xlsx) into a Pandas DataFrame. The dataset consists of input-output pairs (in Malayalam) that will be used for fine-tuning.

Prepare Prompt Format: A template for input and output is created. The input questions (like "What are some methods for improving soil fertility?") and the expected response format (in Malayalam) are formatted as prompts.

Model and Fine-tuning Configuration: The script sets up the base model (Llama-3.2-1B-Instruct) for causal language modeling (using LoRA for efficient fine-tuning). The fine-tuning parameters are defined (e.g., LoRA parameters, 4-bit quantization settings).

Load Model and Tokenizer: The pre-trained model is loaded along with its tokenizer. The model is configured to avoid using cache, and padding is set to the right for the tokenizer.

Data Preprocessing: The dataset is processed, combining the input and output into a single string for each example, formatted with the " ### Response: " separator.

Fine-tuning Setup: LoRA configuration is set up to allow fine-tuning with lower memory requirements. The model is fine-tuned using the SFTTrainer class, which uses the dataset and LoRA parameters. The model is trained for 20 epochs with gradient checkpointing and batch size set to 1.

Model Saving: After fine-tuning, the model is saved in a directory (./results). The model is also merged with the LoRA weights to form the final fine-tuned model.

Inference: The model is used for inference by providing a prompt related to agricultural soil health in organic farming. The model generates a response, which is then cleaned and printed.

Save and Reload the Fine-tuned Model: The fine-tuned model is saved to a directory (final_weights_new), and the tokenizer is saved as well for future use.

Conversion to GGUF Format:

The model weights are converted into the GGUF format using a script (convert_hf_to_gguf.py).
The model is then quantized using llama-quantize to further reduce the size and increase inference efficiency. The final quantized model is saved as ggml-model-q4_k_m.gguf.

Deployment

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

Install Dependencies:pip install fastapi pydantic llama-cpp-python uvicorn

Start the Backend Server:

uvicorn malayalam:app --reload
Use this as a fallback:
python -m uvicorn malayalam:app --reload
The FastAPI server will be running on http://localhost:8000.

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1evmt1D0D3lt3VnmV2mWqlg-r-c_D4p6p#scrollTo=71QefF0A2hQe)



 

