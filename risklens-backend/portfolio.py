def recommend_portfolio(profile):

    if profile == "Conservative":
        return {"Stocks":20,"Bonds":50,"Gold":20,"MutualFunds":10}

    elif profile == "Balanced":
        return {"Stocks":40,"Bonds":30,"Gold":20,"MutualFunds":10}

    else:
        return {"Stocks":70,"Bonds":10,"Gold":10,"MutualFunds":10}
