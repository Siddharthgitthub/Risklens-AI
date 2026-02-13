def recommend_portfolio(profile):
    if profile == "Conservative":
        return {
            "Stocks": "20%",
            "Bonds": "50%",
            "Gold": "20%",
            "Mutual Funds": "10%"
        }

    elif profile == "Balanced":
        return {
            "Stocks": "40%",
            "Bonds": "30%",
            "Gold": "15%",
            "Mutual Funds": "15%"
        }

    else:  # Aggressive
        return {
            "Stocks": "70%",
            "Bonds": "10%",
            "Gold": "10%",
            "Mutual Funds": "10%"
        }
