# Google Cloud Platform Deployment Guide

This project is configured for deployment to Google Cloud Run via Cloud Build.

## Prerequisites

1. Google Cloud Project with billing enabled
2. GitHub repository connected to Cloud Build
3. Required APIs enabled:
   - Cloud Build API
   - Cloud Run API
   - Container Registry API

## Setup Instructions

### 1. Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Grant Cloud Build Permissions

```bash
# Get the project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

# Grant Cloud Run Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"

# Grant Service Account User role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### 3. Connect GitHub Repository

1. Go to Cloud Build > Triggers in Google Cloud Console
2. Click "Connect Repository"
3. Select GitHub and authorize
4. Choose your NoteSmart repository
5. Create a trigger:
   - **Name**: `notesmart-deploy`
   - **Event**: Push to a branch
   - **Branch**: `^main$` (or your default branch)
   - **Configuration**: Cloud Build configuration file
   - **Location**: `/cloudbuild.yaml`

### 4. Deploy

Push to your main branch to trigger automatic deployment:

```bash
git push origin main
```

## Configuration Files

- **cloudbuild.yaml**: Defines the build and deployment steps
- **Dockerfile**: Multi-stage Docker build for Next.js
- **next.config.mjs**: Configured with `output: 'standalone'` for optimized Docker builds

## Customization

### Change Region

Edit `cloudbuild.yaml` line with `--region` flag (default: `us-central1`)

### Adjust Resources

Modify in `cloudbuild.yaml`:

- `--memory`: RAM allocation (default: 512Mi)
- `--cpu`: CPU allocation (default: 1)
- `--max-instances`: Auto-scaling limit (default: 10)

### Environment Variables

Add to the Cloud Run deploy step in `cloudbuild.yaml`:

```yaml
- "--set-env-vars"
- "NODE_ENV=production,CUSTOM_VAR=value"
```

## Manual Deployment

```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/$PROJECT_ID/notesmart

# Deploy to Cloud Run
gcloud run deploy notesmart \
  --image gcr.io/$PROJECT_ID/notesmart \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Monitoring

View deployment logs:

- Cloud Build: https://console.cloud.google.com/cloud-build/builds
- Cloud Run: https://console.cloud.google.com/run

## Costs

Estimated monthly cost for low-to-medium traffic:

- Cloud Build: ~$0.003/build minute (120 free minutes/day)
- Cloud Run: Pay per request (2 million requests free/month)
- Container Registry: ~$0.026/GB/month

## Troubleshooting

**Build fails**: Check Cloud Build logs in console
**Deployment fails**: Verify IAM permissions are set correctly
**App errors**: Check Cloud Run logs for runtime errors
