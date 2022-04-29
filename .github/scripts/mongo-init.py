from pymongo import MongoClient

client = MongoClient("mongodb://test-user:test-password@localhost:27017/?retryWrites=true&w=majority")
client.gestishop.command('createUser',
                         'test-user',
                         pwd='test-password',
                         roles=[{'role': 'readWrite', 'db': 'gestishop'}])
client.gestishop['testCollection'].insert_one({"test": "test"})
