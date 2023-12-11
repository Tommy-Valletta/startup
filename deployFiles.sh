#!/bin/bash

while getopts s: flag
do
    case "${flag}" in
        # k) key=${OPTARG};;
        # h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployFiles.sh -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying files for startup to "webboogaloo.click" with BYUCS.pem\n"

# Step 1
printf "\n----> Clear out the previous distribution on the target.\n"
ssh -i ~/Documents/Keys/CS260/BYUCS.pem ubuntu@webboogaloo.click << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 2
printf "\n----> Copy the distribution package to the target.\n"
scp -r -i ~/Documents/Keys/CS260/BYUCS.pem * ubuntu@webboogaloo.click:services/$service/public
