# Remote URL Migration Note

On May 27, 2026, we discovered that GitHub had automatically redirected our repository from `everythinginperspective_nuxt` to `everythinginperspective.github.io`. While the redirect worked for basic git operations, it caused a critical failure in our GitHub Actions workflow.

Specifically, the artifact handoff between the build and deploy jobs failed because the deploy step could not locate the artifact across the repository redirect. The system threw a 404 error when trying to access run ID 26431102280, indicating that the artifact exchange mechanism could not reconcile the two different repository identifiers.

To resolve this, we updated the local git remote URL from https://github.com/everythinginperspective/everythinginperspective_nuxt.git to https://github.com/everythinginperspective/everythinginperspective.github.io.git. The old URL still functions but only through an additional redirect, which introduces unnecessary latency and potential failure points in automated workflows.

Future developers should use the new canonical URL for all references, scripts, and documentation. This ensures consistency and eliminates redirect-related issues in CI/CD pipelines.
