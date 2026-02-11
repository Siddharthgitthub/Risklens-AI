import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import joblib

# load real dataset
df = pd.read_csv("investor_data.csv")
df = df.dropna()

# encode categorical
df = pd.get_dummies(df)

X = df.iloc[:, :-1]
y = df.iloc[:, -1]

# split train/test
X_train,X_test,y_train,y_test = train_test_split(
    X,y,test_size=0.2,random_state=42
)

model = DecisionTreeClassifier(max_depth=6)
model.fit(X_train,y_train)

# predictions
pred = model.predict(X_test)

acc = accuracy_score(y_test,pred)
cm = confusion_matrix(y_test,pred)

print("MODEL ACCURACY:",acc)
print("CONFUSION MATRIX:")
print(cm)

joblib.dump(model,"advanced_model.pkl")
print("Advanced model saved")
# feature importance
importances = model.feature_importances_
features = X.columns

fi = pd.DataFrame({
    "feature": features,
    "importance": importances
}).sort_values(by="importance", ascending=False)

fi.to_csv("feature_importance.csv", index=False)
print("Feature importance saved")
