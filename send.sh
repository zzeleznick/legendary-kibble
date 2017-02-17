#!/bin/bash
#
AUTH_TOKEN="G1yW9dji3VYP85fJosl5r8zoPsHNb8aF1TBYJgMh"
USER_ID="4281086"
MESSAGE="Test post"

curl -H "Content-Type: application/json" \
     -X POST \
     -d "{\"message_format\": \"text\", \"message\": \"$MESSAGE\" }" \
     https://api.hipchat.com/v2/user/$USER_ID/message?auth_token=$AUTH_TOKEN
