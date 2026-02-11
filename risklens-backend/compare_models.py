import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib

df = pd.read_csv("investor_real.csv")

X = df.drop("risk_profile",axis=1)
y = df["risk_profile"]

X_train,X_test,y_train,y_test = train_test_split(
    X,y,test_size=0.25,random_state=42
)

dt = DecisionTreeClassifier(max_depth=5)
rf = RandomForestClassifier(n_estimators=150)
lr = LogisticRegression(max_iter=2000)

dt.fit(X_train,y_train)
rf.fit(X_train,y_train)
lr.fit(X_train,y_train)

dt_acc = accuracy_score(y_test,dt.predict(X_test))
rf_acc = accuracy_score(y_test,rf.predict(X_test))
lr_acc = accuracy_score(y_test,lr.predict(X_test))

print("Decision Tree Accuracy:",dt_acc)
print("Random Forest Accuracy:",rf_acc)
print("Logistic Regression Accuracy:",lr_acc)

best_model = rf
joblib.dump(best_model,"final_model.pkl")

print("BEST MODEL SAVED → final_model.pkl")
