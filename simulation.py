import numpy as np
import matplotlib.pyplot as plt

def monte_carlo_simulation(initial=10000, years=10, sims=500):

    # multi asset returns
    stock_returns = np.random.normal(0.14, 0.25, (years, sims))
    bond_returns = np.random.normal(0.06, 0.08, (years, sims))
    gold_returns = np.random.normal(0.08, 0.12, (years, sims))

    portfolio = np.zeros((years, sims))
    portfolio[0] = initial

    for t in range(1, years):
        portfolio[t] = portfolio[t-1] * (
            0.6*(1+stock_returns[t]) +
            0.3*(1+bond_returns[t]) +
            0.1*(1+gold_returns[t])
        )

    final_values = portfolio[-1]

    plt.figure(figsize=(7,4))
    plt.plot(portfolio, alpha=0.3)
    plt.title("AI Monte Carlo Portfolio Simulation")
    plt.xlabel("Years")
    plt.ylabel("Portfolio Value")
    plt.savefig("static/simulation.png")
    plt.close()

    return {
        "median": float(np.median(final_values)),
        "worst": float(np.min(final_values)),
        "best": float(np.max(final_values))
    }
