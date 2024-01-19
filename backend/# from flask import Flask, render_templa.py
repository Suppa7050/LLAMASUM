# from flask import Flask, render_template
# import subprocess

# app = Flask(_name_)

# @app.route('/')
# def index():
#     command = 'your_command_here'
#     process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#     stdout, stderr = process.communicate()
#     print("Output:", stdout.decode())
#     print("Error:", stderr.decode())
#     return render_template('index.html')

# if _name_ == '_main_':
#     app.run(debug=True)


import subprocess
import json
import time

# Set your Kaggle credentials
kaggle_username = "your_kaggle_username"
kaggle_key = "your_kaggle_api_key"

# Set the notebook name and path
notebook_name = "your_notebook_name.ipynb"
notebook_path = "/path/to/your/notebook"

# Set the input data path
input_data_path = "/path/to/your/input/data"

# Set the output path
output_path = "/path/to/output"

# Step 1: Upload notebook to Kaggle
upload_command = f"kaggle kernels push -p {notebook_path}"
subprocess.run(upload_command, shell=True)

# Step 2: Run notebook on Kaggle GPU
run_command = f"kaggle kernels run -p {notebook_path} -i {input_data_path} --kernel {notebook_name}"
process = subprocess.Popen(run_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Wait for the notebook run to complete
process.wait()

# Step 3: Check the status of the notebook run
status_command = f"kaggle kernels status {notebook_name}"
while True:
    status_process = subprocess.Popen(status_command, shell=True, stdout=subprocess.PIPE)
    status_output = json.loads(status_process.communicate()[0])
    if status_output["status"] == "complete":
        break
    elif status_output["status"] == "running":
        time.sleep(10)  # Wait for 10 seconds before checking the status again
    else:
        print(f"Notebook run failed with status: {status_output['status']}")
        exit(1)

# Step 4: Retrieve the notebook output
output_command = f"kaggle kernels output -p {output_path} {notebook_name}"
subprocess.run(output_command, shell=True)
