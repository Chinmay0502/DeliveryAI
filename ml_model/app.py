from flask import Flask, request, jsonify
import pandas as pd
import pickle
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "delivery_model.pkl")
COLUMNS_PATH = os.path.join(BASE_DIR, "columns.pkl")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(COLUMNS_PATH, "rb") as f:
    columns = pickle.load(f)


@app.route("/")
def home():
    return jsonify({
        "message": "Delivery Prediction API Running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json()

        input_data = {col: 0 for col in columns}

        input_data["Order_ID"] = int(data["Order_ID"])

        input_data["Distance_km"] = float(
            data["Distance_km"]
        )

        input_data["Preparation_Time_min"] = float(
            data["Preparation_Time_min"]
        )

        input_data["Courier_Experience_yrs"] = float(
            data["Courier_Experience_yrs"]
        )

        weather = f"Weather_{data['Weather']}"

        if weather in input_data:
            input_data[weather] = 1

        traffic = f"Traffic_Level_{data['Traffic_Level']}"

        if traffic in input_data:
            input_data[traffic] = 1

        time = f"Time_of_Day_{data['Time_of_Day']}"

        if time in input_data:
            input_data[time] = 1

        vehicle = f"Vehicle_Type_{data['Vehicle_Type']}"

        if vehicle in input_data:
            input_data[vehicle] = 1

        df = pd.DataFrame([input_data])

        prediction = model.predict(df)

        return jsonify({
            "success": True,
            "predicted_delivery_time": round(
                float(prediction[0]),
                2
            )
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port
    )