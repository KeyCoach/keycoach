#!/bin/bash
npm ci &&
	npm run test-slow-silent &&
	npm run build &&
	npx cdk synth &&
	rm -rf cdk.out tsc.out &&
	echo -e "\033[32m######## Successful Deployment Test ########\033[0m" &&
	echo
