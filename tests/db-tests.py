import pymongo

try:
    print('First try')
    print(pymongo.MongoClient("mongodb://test-user:test-password@localhost:27017/gestishop?retryWrites=true&w=majority")['gestishop']['taxes'].find_one())
except:
    print('Second try')
    print(pymongo.MongoClient("mongodb://test-user:test-password@localhost:27017/?retryWrites=true&w=majority")['gestishop']['taxes'].find_one())
