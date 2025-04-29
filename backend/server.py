import torch
import torchvision.transforms as transforms
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS  # Fixes CORS issue
import logging
import pandas as pd
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the traced PyTorch model
MODEL_PATH = "/Users/lakshiitakalyanasundaram/AgriGaurd/backend/plant_disease_model_traced.pt"
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file {MODEL_PATH} not found")
model = torch.jit.load(MODEL_PATH, map_location=torch.device('cpu'))  # Load model on CPU
model.eval()  # Set the model to evaluation mode

# Load class names from CSV
CLASS_MAPPING_PATH = "/Users/lakshiitakalyanasundaram/AgriGaurd/backend/plant_disease_mapping.csv"
if not os.path.exists(CLASS_MAPPING_PATH):
    raise FileNotFoundError(f"Class mapping file {CLASS_MAPPING_PATH} not found")
class_mapping_df = pd.read_csv(CLASS_MAPPING_PATH)

# Extract class names and ensure they are in the correct order
class_names = class_mapping_df['Disease_Name'].tolist()

# Define image transformations (same as used during training)
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize to match input size
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])  # Normalize with ImageNet stats
])

@app.route('/')
def home():
    return "Plant Disease Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Validate file type (only JPG allowed)
        if not file.filename.lower().endswith(('.jpg', '.jpeg')):
            return jsonify({"error": "Invalid file type. Please upload a JPG image."}), 400

        # Load and preprocess the image
        image = Image.open(file).convert('RGB')
        image = transform(image)
        image = image.unsqueeze(0)  # Add batch dimension

        # Make prediction
        with torch.no_grad():
            outputs = model(image)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)  # Convert to probabilities
            _, predicted_class = torch.max(outputs, 1)
            predicted_index = int(predicted_class.item())
            predicted_disease = class_names[predicted_index]

        # Get top 3 predictions
        top3_prob, top3_indices = torch.topk(probabilities, 3)
        top3_prob = top3_prob.squeeze().tolist()
        top3_indices = top3_indices.squeeze().tolist()
        top3_diseases = [class_names[idx] for idx in top3_indices]

        # Log the prediction
        logger.info(f"Predicted class index: {predicted_index}, Disease: {predicted_disease}")
        logger.info(f"Top 3 predictions: {list(zip(top3_diseases, top3_prob))}")

        # Return predicted class index, disease name, and top 3 predictions
        return jsonify({
            "prediction": predicted_index,
            "disease": predicted_disease,
            "top3_predictions": list(zip(top3_diseases, top3_prob))
        })
    
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Ensure accessible in network