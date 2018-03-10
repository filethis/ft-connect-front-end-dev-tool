# Project configuration
NAME=ft-connect-front-end-sdk-tool
VERSION=0.0.35
LOCAL_PORT=3456
GITHUB_USER=filethis
GITHUB_USER_ABBREV=ft
BOWER_NAMESPACE=FileThis
QUERY_STRING=${FT_POLYMER_QUERY_STRING}
#QUERY_STRING="?devel=1"
CDN_DISTRIBUTION_ID=EJ2RMYD38WUXM

# Project targets
include project-application.make

# Override the default. Can't use BrowserSync on this app. Makes node.js throw up.
.PHONY: serve
serve: project-serve-python  ## Shortcut for project-serve-python
	@echo Done;
