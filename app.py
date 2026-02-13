from flask import Flask, render_template, request
from behavior import analyze_behavior
from simulation import monte_carlo_simulation
from portfolio import recommend_portfolio
from ml_model import cluster_investor

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    # Get answers from form
    q1 = int(request.form["q1"])
    q2 = int(request.form["q2"])
    q3 = int(request.form["q3"])
    q4 = int(request.form["q4"])
    q5 = int(request.form["q5"])

    answers = [q1, q2, q3, q4, q5]

    # Behavioral analysis
    behavior_result = analyze_behavior(answers)

    # Monte Carlo simulation
    sim_result = monte_carlo_simulation()

    # Portfolio recommendation
    portfolio = recommend_portfolio(behavior_result["profile"])
    # ML clustering
    investor_group = cluster_investor(behavior_result["score"])

    return render_template(
        "dashboard.html",
        behavior=behavior_result,
        sim=sim_result,
        portfolio=portfolio,
        group=investor_group
    )

if __name__ == "__main__":
    app.run(debug=True)
