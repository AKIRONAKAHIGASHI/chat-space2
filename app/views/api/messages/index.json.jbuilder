json.array! @new_messages do |message|
  json.content message.content
  json.image message.image
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
  json.name message.user.name
  json.group_id message.group_id
  json.id message.id
end
