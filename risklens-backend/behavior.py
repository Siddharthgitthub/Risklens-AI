def analyze_behavior(answers):

    score = sum(answers)
    max_score = len(answers)*5
    risk_percent = (score/max_score)*100

    if risk_percent < 40:
        profile = "Conservative"
    elif risk_percent < 70:
        profile = "Balanced"
    else:
        profile = "Aggressive"

    return {
        "score": score,
        "risk_percent": round(risk_percent,2),
        "profile": profile,
        "loss_bias": "Moderate",
        "overconfidence": "Medium"
    }
