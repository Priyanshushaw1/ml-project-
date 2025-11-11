from flask import Flask, request, jsonify

from flask_cors import CORS  # ✅ Added CORS support
import joblib

app = Flask(__name__)
CORS(app)  # ✅ Allow requests from frontend (any origin)

# Load trained model
model = joblib.load("recommend.pkl")

@app.route("/")
def home():
    return {"message": "ML Model API is running!"}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    interests = data.get("interests", [])

    user_text = " ".join(interests)
    prediction = model.predict([user_text])[0]

    return jsonify({"group": prediction})

if __name__ == "__main__":
    app.run(debug=True)
