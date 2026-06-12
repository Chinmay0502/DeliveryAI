from flask import Flask, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)

model = pickle.load(open("delivery_model.pkl", "rb"))
columns = pickle.load(open("columns.pkl", "rb"))


@app.route("/")
def home():
    return jsonify({
        "message": "Delivery Prediction API Running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        # Create all columns with default 0
        input_data = {col: 0 for col in columns}

        # Numeric fields
        input_data["Order_ID"] = int(data["Order_ID"])
        input_data["Distance_km"] = float(data["Distance_km"])
        input_data["Preparation_Time_min"] = float(
            data["Preparation_Time_min"]
        )
        input_data["Courier_Experience_yrs"] = float(
            data["Courier_Experience_yrs"]
        )

        # Weather
        weather = f"Weather_{data['Weather']}"
        if weather in input_data:
            input_data[weather] = 1

        # Traffic
        traffic = f"Traffic_Level_{data['Traffic_Level']}"
        if traffic in input_data:
            input_data[traffic] = 1

        # Time
        time = f"Time_of_Day_{data['Time_of_Day']}"
        if time in input_data:
            input_data[time] = 1

        # Vehicle
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
    app.run(debug=True, port=5000)