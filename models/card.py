from factory.database import Database

class Card(object):
    def __init__(self):
        self.db = Database()

        self.collection_name = 'cards'

    def create(self, card):
        res = self.db.insert(card, self.collection_name)
        return 'Inserted Id ' + res  
    
    def find(self, todo):  # find all
        return self.db.find(todo, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, card):
        return self.db.update(id, card, self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)