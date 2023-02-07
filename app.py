import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template, jsonify, request
from models import card

app = Flask(__name__)

card = card.Card()

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/card', methods = ['GET', 'POST'])
def io_items(): 

    if request.method == 'GET':
        return jsonify(card.find({})), 200

    elif request.method == 'POST':
        doc = {
            'url': request.form['article'],
            'comment': request.form['comment']
        }

        response = card.create(doc)
        return response, 201

if __name__ == '__main__':
    app.run('0.0.0.0', port = 5000, debug = True)