import numpy as np

def analyze_behavior(answers):
    score = sum(answers)

    # Risk profile detection
    if score <= 15:
        profile = "Conservative"
    elif score <= 25:
        profile = "Balanced"
    else:
        profile = "Aggressive"

    # Bias detection
    loss_aversion = "High" if answers[0] < 3 else "Low"
    overconfidence = "High" if answers[3] > 3 else "Medium"

    return {
        "profile": profile,
        "loss_aversion": loss_aversion,
        "overconfidence": overconfidence,
        "score": score
    }
