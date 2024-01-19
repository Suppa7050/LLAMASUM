from flask import Flask, render_template, request

import PyPDF2
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/summary', methods=['GET', 'POST'])
@cross_origin()
def index():
    if request.method == 'POST':
        inp=request.files
        print(inp)
        pdf_text=""
        for i in inp.getlist("file"):
            pdf_text += read_pdf(i)
        print(json.dumps(pdf_text))
        # return render_template('index.html', pdf_text=pdf_text)
        # return json.dumps(pdf_text)
        d={
            "headers":{
                "Access-Control-Allow-Origin": "*"
            },
            "body":pdf_text
        }
        return json.dumps(d)

    # return render_template('index.html')
    return json.dumps("Post request is not called")


def read_pdf(file):
    pdf_reader = PyPDF2.PdfReader(file)

    text = ''
    for page in pdf_reader.pages:
        text += page.extract_text()

    return text

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)



# if 'file' not in request.files:
#             return json.dumps('No file part')

#         file = request.files['file']

#         if file.filename == '':
#             return json.dumps('No selected file')

#         if not file.filename.endswith('.pdf'):
#             return json.dumps('Please upload a PDF file')