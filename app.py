from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Add CORS support
from langchain.chains import RetrievalQA
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import OpenAI
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # Enable CORS for all routes

# Set OpenAI API Key (Replace with your actual API key)
os.environ["OPENAI_API_KEY"] = "your_openai_api_key_here"

# Load portfolio data into FAISS vector store
def load_vector_store():
    portfolio_data = [
        {"text": "Victor is a skilled crypto influencer with deep expertise in blockchain technology and frontend web development."},
        {"text": "Victor has founded and manages an airplane company based in Dubai, demonstrating entrepreneurial skills."},
        {"text": "Victor specializes in cybersecurity analysis, providing expert insights and protection strategies."},
        {"text": "With a strong background in technology, Victor has worked on multiple innovative projects across blockchain, web development, and cybersecurity."},
        {"text": "Victor's portfolio showcases a diverse range of technical skills including blockchain development, web design, and security analysis."}
    ]
    embeddings = OpenAIEmbeddings()
    vector_store = FAISS.from_texts([doc["text"] for doc in portfolio_data], embeddings)
    return vector_store

vector_store = load_vector_store()
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    retriever=vector_store.as_retriever(),
    return_source_documents=True
)

# Handle AI queries
@app.route('/query', methods=['POST'])
def query():
    data = request.json
    question = data.get("question", "")
    
    if not question:
        return jsonify({"answer": "Please provide a question."}), 400
    
    try:
        # Use .run() for querying
        answer = qa_chain.run(question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"answer": f"An error occurred: {str(e)}"}), 500

# Serve the main HTML file
@app.route('/')
def serve_html():
    return send_from_directory('.', 'ai.html')

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
