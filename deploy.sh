if [ -z "${AWS_PROFILE}" ]; then
  echo "AWS_PROFILE must be set."
  exit 1
fi

if [ -z "${DOMAIN}" ]; then
  echo "DOMAIN must be set."
  exit 1
fi

aws s3 cp index.html s3://"${DOMAIN}"/
aws s3 cp --recursive static/ s3://"${DOMAIN}"/static/

echo "Deploy complete."