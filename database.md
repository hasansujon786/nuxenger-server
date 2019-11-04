User -hasMany-> Chat -hasMany-> Messages

User

- _id: ObjectId
- name: String
- username: String
- email: String
- password: String
- chats: [ObjectId] -> Chat
- createdAt: Date
- updated: Date

---

Chat

- _id: ObjectId
- title: String
- users: [ObjectId] -> User
- lastMessage: ObjectId -> Message
- createdAt: Date
- updatedAt: Date

---

Messages

- _id: ObjectId
- body: String
- sender: ObjectId -> User
- chat: ObjectId: -> Chat
- createdAt: Date
- updatedAt: Date
