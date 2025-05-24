set -e
email=divyansh21april@gmail.com
first_name=Divyansh
last_name=Gupta
curl -v -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE" -H "Content-Type: application/json" "$SUPABASE_URL/auth/v1/invite" -d "{\"email\": \"$email\", \"data\": { \"first_name\": \"$first_name\", \"last_name\": \"$last_name\", \"custom_user_role\": \"admin\"}}"
echo "Invite sent to $email"
