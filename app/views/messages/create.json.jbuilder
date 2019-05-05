json.id @message.id
json.name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.group_id @message.group_id
json.image @message.image
