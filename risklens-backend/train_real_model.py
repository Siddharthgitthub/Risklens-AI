import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

# load dataset
df = pd.read_csv("investor_data.csv")

print("Dataset preview:")
print(df.head())

# drop rows with missing values
df = df.dropna()

# convert text columns to numeric
df_encoded = pd.get_dummies(df)

print("Columns after encoding:", df_encoded.columns)

# assume last column is target (risk label)
X = df_encoded.iloc[:, :-1]
y = df_encoded.iloc[:, -1]

model = DecisionTreeClassifier(max_depth=5)
model.fit(X, y)

joblib.dump(model, "real_risk_model.pkl")

print("MODEL TRAINED SUCCESSFULLY")
