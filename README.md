Bank Customer Intelligence System

A full-stack machine learning application for bank customer analysis. The system predicts whether a customer is likely to subscribe to a term deposit and assigns the customer to a meaningful segment.

## Features

- Term-deposit subscription prediction
- Prediction probability
- Customer segmentation with K-Means
- Interactive analytics dashboard
- FastAPI REST API
- React and Vite frontend
- EDA, classification, and clustering notebooks

## Dataset

The project uses the **UCI Bank Marketing dataset** stored in:

```text
dataset/bank-full.csv
```

Dataset summary:

- **45,211 records**
- **17 columns**
- **Target:** `y`
- **Classes:** `yes` and `no`
- **Positive class:** approximately 11.7%
- **Missing values:** 0
- **Duplicate rows:** 0

The deployed models use these features:

```text
age, job, marital, education, balance, housing, loan, campaign
```

The `duration` feature was excluded because it is only known after the marketing call and would cause data leakage.

## Machine Learning Models

### Classification

Three models were trained and compared:

| Model | Accuracy | Precision | Recall | F1-Score |
|---|---:|---:|---:|---:|
| Random Forest | **0.7997** | **0.2733** | 0.4291 | **0.3339** |
| XGBoost | 0.7143 | 0.2265 | 0.5974 | 0.3285 |
| Logistic Regression | 0.6376 | 0.1917 | **0.6522** | 0.2963 |

**Random Forest** was selected as the final classification model because it achieved the highest F1-score.

Random Forest results:

- Correctly predicted **6,778 non-subscribers**
- Correctly predicted **454 subscribers**
- Incorrectly predicted **1,207 non-subscribers** as subscribers
- Missed **604 actual subscribers**

### Customer Segmentation

The following clustering algorithms were evaluated:

- K-Means
- Agglomerative Clustering
- DBSCAN

**K-Means with two clusters** was selected because it produced clear and usable customer segments and can assign new customers to a cluster.

| Metric | Result |
|---|---:|
| Silhouette Score | **0.5968** |
| Davies-Bouldin Index | **0.8302** |

Segments:

- **Cluster 0:** 43,316 typical-balance customers
- **Cluster 1:** 1,895 high-balance professional customers
- **Cluster 0 subscription rate:** 11.53%
- **Cluster 1 subscription rate:** 15.51%

## Technology Stack

### Machine Learning

- Python
- pandas
- scikit-learn
- XGBoost
- Joblib
- Matplotlib
- Seaborn

### Backend

- FastAPI
- Pydantic
- Uvicorn

### Frontend

- React
- Vite
- Axios
- React Router
- CSS

### Testing

- Pytest

## Project Structure

```text
Bank-Customer-Intelligence-System/
├── backend/
│   ├── api/
│   │   ├── app.py
│   │   ├── schemas.py
│   │   └── services.py
│   └── models/
├── dataset/
│   └── bank-full.csv
├── frontend/
│   ├── src/
│   └── package.json
├── notebooks/
│   ├── eda.ipynb
│   ├── classification.ipynb
│   └── clustering.ipynb
├── tests/
├── requirements.txt
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Bank-Customer-Intelligence-System
```

### 2. Create the Python environment

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

### 3. Generate the model files

The trained `.pkl` files are excluded from Git. Run the notebooks to generate them:

```bash
cd notebooks
jupyter lab
```

Run:

1. `eda.ipynb`
2. `classification.ipynb`
3. `clustering.ipynb`

The notebooks generate the required model files inside:

```text
backend/models/
```

### 4. Start the backend

From the project root:

```bash
uvicorn backend.api.app:app --reload
```

Available URLs:

- API: `http://127.0.0.1:8000`
- Swagger documentation: `http://127.0.0.1:8000/docs`

### 5. Start the frontend

Node.js `20.19+` or `22.12+` is recommended.

```bash
cd frontend
npm install
```

Create `.env` from `.env.example`, then run:

```bash
npm run dev
```

Dashboard:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Check API status |
| `POST` | `/predict` | Predict term-deposit subscription |
| `POST` | `/cluster` | Assign a customer segment |

## Important Note

The backend requires the generated classification and clustering model files inside `backend/models/`. If the model files do not exist, run the notebooks before starting the API.
