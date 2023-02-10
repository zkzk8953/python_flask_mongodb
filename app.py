import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template, jsonify, request, make_response
from models import card

app = Flask(__name__)

card = card.Card()

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/card', methods = ['GET', 'POST', 'PUT', 'DELETE'])
def io_items(): 
    if request.method == 'GET':
        data = card.find({})

        return jsonify({'status': 200, 'data': data})

    elif request.method == 'POST':
        headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
        
        url_receive = request.form['url']
        comment_receive = request.form['comment']

        res = requests.get(url_receive, headers = headers)
        soup = BeautifulSoup(res.text, 'html.parser')

        image_org = soup.select_one('meta[property = "og:image"]')
        title_org = soup.select_one('meta[property = "og:title"]')
        description_org = soup.select_one('meta[property = "og:description"]')

        url_img = image_org['content']
        url_title = title_org['content']
        url_description = description_org['content']

        doc = {
            'url': url_receive,
            'comment': comment_receive,
            'desc': url_description,
            'image': url_img,
            'title': url_title
        }

        card.create(doc)
        return jsonify({ 'status': 200, 'message': '추가되었습니다.' })
    
    elif request.method == 'PUT':
        headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

        id_receive = request.form['id']
        url_receive = request.form['url']
        comment_receive = request.form['comment']

        res = requests.get(url_receive, headers = headers)
        soup = BeautifulSoup(res.text, 'html.parser')

        image_org = soup.select_one('meta[property = "og:image"]')
        title_org = soup.select_one('meta[property = "og:title"]')
        description_org = soup.select_one('meta[property = "og:description"]')

        url_img = image_org['content']
        url_title = title_org['content']
        url_description = description_org['content']

        doc = {
            'url': url_receive,
            'comment': comment_receive,
            'desc': url_description,
            'image': url_img,
            'title': url_title
        }

        card.update(id_receive, doc)
        return jsonify({ 'status': 200, 'message': '수정되었습니다.' })

    elif request.method == 'DELETE':
        id_receive = request.form['id']

        card.delete(id_receive)
        return jsonify({ 'status': 200, 'message': '삭제되었습니다.' })


if __name__ == '__main__':
    app.run('0.0.0.0', port = 5000, debug = True)