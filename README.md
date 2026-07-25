# Bank Customer Intelligence System

Machine learning project that:

- Predicts whether a bank customer will subscribe to a term deposit
- Assigns the customer to Cluster 0 or Cluster 1
- Provides prediction probability and cluster description
- Uses FastAPI backend and React frontend

## Project Structure

```text
Bank-Customer-Intelligence-System/

├── backend/
│   ├── api/
│   │   ├── app.py
│   │   ├── predict.py
│   │   ├── cluster.py
│   │   └── config.py
│   ├── models/
│   └── src/
├── dataset/
│   └── bank-full.csv
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   └── package.json
├── notebooks/
│   ├── eda.ipynb
│   ├── classification.ipynb
│   └── clustering.ipynb
├── tests/
├── requirements.txt
└── README.md
```

## Setup

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Run Project

### 1. Start Backend

From the project root:

```bash
uvicorn backend.api.app:app --reload
```

Backend API:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### 2. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Prediction API

POST:

```text
/predict
```

Example input:

```json
{
  "age": 35,
  "job": "technician",
  "marital": "married",
  "education": "secondary",
  "balance": 2500,
  "housing": "no",
  "loan": "no",
  "campaign": 2
}
```

Response:

```json
{
  "prediction": "Yes",
  "probability": 0.89
}
```

The prediction can return:

```text
Yes
No
```

## Customer Segmentation API

POST:

```text
/cluster
```

Example input:

```json
{
  "age": 35,
  "job": "technician",
  "marital": "married",
  "education": "secondary",
  "balance": 2500,
  "housing": "no",
  "loan": "no",
  "campaign": 2
}
```

Response:

```json
{
  "cluster": 0,
  "description": "Typical-balance customers, often blue-collar or secondary-educated, with many holding housing loans."
}
```

The clustering model returns:

```text
Cluster 0
Cluster 1
```

## Models Used

### Classification

- Logistic Regression
- Random Forest
- XGBoost

### Clustering

- K-Means
- Agglomerative Clustering
- DBSCAN

## Technologies

- Python
- Pandas
- Scikit-learn
- XGBoost
- FastAPI
- React
- Vite
- Axios
- Joblib
- Pytest
