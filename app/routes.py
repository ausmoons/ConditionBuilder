from app import *
import json
from app.models import Subject


@app.route('/api/subjects', methods=['GET'])
def getAll():
    all_subjects = Subject.query.all()
    arr = []
    for subject in all_subjects:
        obj = {}
        obj['id'] = json.dumps(subject.id)
        obj['data'] = json.loads(subject.data)
        arr.append(obj)
    return jsonify(arr)


@app.route('/api/subjects', methods=['POST'])
def newSubject():
    newSubject = Subject(data=request.data)
    db.session.add(newSubject)
    db.session.commit()
    obj1 = {}
    obj1['id'] = json.dumps(newSubject.id)
    obj1['data'] = json.loads(newSubject.data)
    return obj1


@app.route('/api/subjects/<id>', methods=['GET'])
def get_subject(id):
    subject = Subject.query.get(id)
    obj1 = {}
    obj1['id'] = json.dumps(subject.id)
    obj1['data'] = json.loads(subject.data)
    return obj1


@app.route('/api/subjects/<id>', methods=['DELETE'])
def delete_subject(id):
    subject = Subject.query.get(id)
    db.session.delete(subject)
    db.session.commit()
    return "Subject has been deleted"


@app.route('/api/config', methods=['GET'])
def getConfig():
    config = {}
    gender = []
    male = {}
    male['value'] = 'male'
    male['title'] = 'Male'
    female = {}
    female['value'] = 'female'
    female['title'] = 'Female'
    gender.append(male)
    gender.append(female)
    config['gender'] = gender

    language = []
    latvian = {}
    latvian['value'] = 'lv'
    latvian['title'] = 'Latvian'
    english = {}
    english['value'] = 'en'
    english['title'] = 'English'
    russian = {}
    russian['value'] = 'ru'
    russian['title'] = 'Russian'
    language.append(latvian)
    language.append(english)
    language.append(russian)
    config['language'] = language

    channel = []
    sms = {}
    sms['value'] = 'sms'
    sms['title'] = 'sms'
    call = {}
    call['value'] = 'call'
    call['title'] = 'call'
    email = {}
    email['value'] = 'email'
    email['title'] = 'email'

    channel.append(sms)
    channel.append(call)
    channel.append(email)
    config['channel'] = channel

    return config


if __name__ == '__main__':
    app.run(debug=True)
