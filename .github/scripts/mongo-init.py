from pymongo import MongoClient

client = MongoClient("mongodb://test-user:test-password@localhost:27017/?retryWrites=true&w=majority")
print(client.server_info())
collection = client['gestishop']['testCollection']
collection.insert_one({"test": "test"})
print(collection.find_one())
