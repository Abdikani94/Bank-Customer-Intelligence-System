# Bank Customer Intelligence System

An end-to-end machine learning web application for bank marketing analysis. The project will combine supervised classification to predict term-deposit subscriptions with unsupervised clustering to identify customer segments.

## Project scope

- Classification: Logistic Regression, Random Forest, and XGBoost
- Clustering: K-Means, Agglomerative Clustering, and DBSCAN
- Backend: FastAPI REST API
- Frontend: React dashboard
- Dataset: UCI Bank Marketing dataset (bank-full.csv)

Phase 1 creates the project structure and development environment only. EDA, preprocessing, model training, API implementation, and frontend implementation will be completed in later phases.

## Repository structure

    Bank-Customer-Intelligence-System/
    ├── dataset/
    │   └── bank-full.csv
    ├── notebooks/
    ├── frontend/
    │   ├── public/
    │   └── src/
    │       ├── components/
    │       ├── pages/
    │       └── services/
    ├── backend/
    │   ├── api/
    │   ├── models/
    │   └── src/
    ├── tests/
    ├── .env.example
    ├── .gitignore
    ├── .python-version
    ├── README.md
    └── requirements.txt

## Python environment setup (Windows PowerShell)

Python 3.11 is recommended.

    cd C:\Users\Pc\Desktop\Bank-Customer-Intelligence-System
    py -3.11 -m venv .venv
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\.venv\Scripts\Activate.ps1
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt
    python -m ipykernel install --user --name bank-customer-intelligence --display-name "Python (Bank Customer Intelligence)"

To activate the environment later:

    cd C:\Users\Pc\Desktop\Bank-Customer-Intelligence-System
    .\.venv\Scripts\Activate.ps1

To leave it:

    deactivate

## Environment configuration

    Copy-Item .env.example .env

The local .env file is ignored by Git. Do not commit secrets or machine-specific settings.

## Dataset

The project uses dataset/bank-full.csv, containing 45,211 customer records and 17 columns. The target column is y, which indicates whether a customer subscribed to a term deposit.

Dataset source: [Bank Marketing Dataset on Kaggle](https://www.kaggle.com/datasets/mdnaimislam165436/bank-marketing-dataset-uci)

## Current status

Phase 1 project setup is complete. EDA and model training have not started.
