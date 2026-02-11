import pandas as pd
import random

data = []

for i in range(2000):

    age = random.randint(21,60)
    income = random.randint(20000,200000)
    experience = random.randint(0,20)
    savings = random.randint(5000,150000)
    debt = random.randint(0,80000)
    dependents = random.randint(0,5)

    # behavioral scores
    discipline = random.randint(1,5)
    risk_tolerance = random.randint(1,5)
    knowledge = random.randint(1,5)

    # risk logic with noise
    score = (
        income/50000 +
        experience +
        savings/20000 -
        debt/30000 +
        risk_tolerance*2 +
        knowledge
    )

    score += random.uniform(-3,3)  # noise

    if score < 5:
        risk = "Conservative"
    elif score < 12:
        risk = "Balanced"
    else:
        risk = "Aggressive"

    data.append([
        age,income,experience,savings,debt,
        dependents,discipline,risk_tolerance,
        knowledge,risk
    ])

cols = [
"age","income","experience","savings","debt",
"dependents","discipline","risk_tolerance",
"knowledge","risk_profile"
]

df = pd.DataFrame(data,columns=cols)
df.to_csv("investor_real.csv",index=False)

print("REALISTIC DATASET GENERATED: investor_real.csv")
