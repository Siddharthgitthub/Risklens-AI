import numpy as np
from sklearn.cluster import KMeans

def cluster_investor(score):
    # sample dataset: [risk score]
    data = np.array([[5],[10],[15],[20],[25],[30],[35]])

    kmeans = KMeans(n_clusters=3, random_state=0)
    kmeans.fit(data)

    cluster = kmeans.predict([[score]])[0]

    if cluster == 0:
        return "Safe Investor Group"
    elif cluster == 1:
        return "Moderate Investor Group"
    else:
        return "High Risk Investor Group"
