import joblib
import pandas as pd

model = joblib.load("final_model.pkl")

def predict_risk_real(user_dict):

    df = pd.DataFrame([user_dict])
    df = pd.get_dummies(df)

    model_cols = model.feature_names_in_
    df = df.reindex(columns=model_cols, fill_value=0)

    prediction = model.predict(df)[0]

    proba = model.predict_proba(df)[0]
    confidence = round(max(proba)*100,2)

    return prediction, confidence
