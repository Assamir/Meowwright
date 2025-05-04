# CI/CD Setup for Meowwright

This document describes how to set up and use the CI/CD pipeline for Meowwright using Google Cloud Build.

## Overview

The CI/CD pipeline is configured to:

1. Install Node.js dependencies
2. Install Playwright browsers (Chromium)
3. Run Playwright tests
4. Upload test reports and artifacts to Google Cloud Storage

## Prerequisites

Before you can use the CI/CD pipeline, you need to:

1. Create a Google Cloud Platform (GCP) account if you don't have one
2. Create a new project in GCP
3. Enable the Cloud Build API
4. Create a Cloud Storage bucket for test reports and artifacts
5. Set up appropriate permissions

## Setting Up Google Cloud Build

### 1. Create a Cloud Storage Bucket

1. Go to the Cloud Storage section in your GCP console
2. Click "Create Bucket"
3. Name your bucket (e.g., "meowwright-test-results")
4. Choose your settings for location, storage class, etc.
5. Click "Create"

### 2. Update the cloudbuild.yaml File

Update the `_BUCKET_NAME` substitution variable in the `cloudbuild.yaml` file to match your bucket name:

```yaml
substitutions:
  _BUCKET_NAME: 'meowwright-test-results'
```

### 3. Connect Your Repository to Cloud Build

1. Go to the Cloud Build section in your GCP console
2. Click "Triggers"
3. Click "Connect Repository"
4. Select your repository provider (GitHub, Bitbucket, etc.)
5. Authenticate and select your repository
6. Click "Connect"

### 4. Create a Build Trigger

1. In the Cloud Build Triggers section, click "Create Trigger"
2. Name your trigger (e.g., "Meowwright Tests")
3. Select your repository
4. Set the trigger event (e.g., push to a branch, pull request)
5. Set the source to the branch you want to trigger builds from
6. Set the configuration to "Cloud Build configuration file (yaml or json)"
7. Set the location to "Repository" and the path to "cloudbuild.yaml"
8. Click "Create"

## Running the Pipeline Manually

You can also run the pipeline manually:

1. Go to the Cloud Build section in your GCP console
2. Click "Triggers"
3. Find your trigger and click "Run Trigger"
4. Select the branch you want to build
5. Click "Run"

## Viewing Test Results

After a build completes:

1. Go to the Cloud Build section in your GCP console
2. Click "History"
3. Click on the build you want to view
4. You can see the build logs and steps
5. To view test reports, go to your Cloud Storage bucket and navigate to the reports folder

## Customizing the Pipeline

You can customize the pipeline by editing the `cloudbuild.yaml` file:

- Add additional steps for linting, security scanning, etc.
- Change the machine type for better performance
- Adjust timeouts
- Add notifications

## Troubleshooting

If you encounter issues with the pipeline:

1. Check the build logs in Cloud Build
2. Verify that your Cloud Storage bucket exists and is accessible
3. Ensure that Cloud Build has the necessary permissions
4. Check that your repository is properly connected to Cloud Build
