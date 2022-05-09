from pymongo import MongoClient
from pymongo.errors import OperationFailure

print('Connecting to database...')
client = MongoClient("mongodb://test-user:test-password@localhost:27017/?retryWrites=true&w=majority")

print('Dropping database...')
client.gestishop.command('dropDatabase')

try:
    print('Creating user...')
    client.gestishop.command('createUser',
                             'test-user',
                             pwd='test-password',
                             roles=[{'role': 'readWrite', 'db': 'gestishop'}])
except OperationFailure:
    print('The user already existed.')

print('Inserting test data...')
client.gestishop['testCollection'].insert_one({})
