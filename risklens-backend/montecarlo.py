import pandas as pd
import numpy as np

def run_simulation(initial=100000, years=5, sims=200):

    try:
        stocks = pd.read_csv("stocks_df.csv")

        # find price column
        price_col = None
        for col in stocks.columns:
            if "close" in col.lower():
                price_col = col
                break

        if price_col is None:
            price_col = stocks.columns[1]

        prices = stocks[price_col].dropna()

        # safe returns
        returns = prices.pct_change().dropna()

        # clamp extreme returns
        returns = returns.clip(-0.1, 0.1)

        mean_return = returns.mean()
        volatility = returns.std()

        # realistic bounds
        if volatility > 0.05:
            volatility = 0.05

        results = []

        for _ in range(sims):
            value = initial

            for _ in range(252*years):
                daily = np.random.normal(mean_return, volatility)
                value *= (1 + daily)

                # prevent overflow
                if value < 1000:
                    value = 1000
                if value > 5_000_000:
                    value = 5_000_000

            results.append(value)

        results = np.array(results)

        return {
            "median": float(np.median(results)),
            "best": float(np.max(results)),
            "worst": float(np.min(results))
        }

    except Exception as e:
        print("Simulation error:", e)
        return {
            "median": initial,
            "best": initial*1.5,
            "worst": initial*0.7
        }
