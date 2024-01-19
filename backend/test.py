import kaggle
import subprocess
import json

# Authenticate with Kaggle API
kaggle.api.authenticate()

# Create a dataset (if it doesn't exist)
# kaggle.api.dataset_create_new("D:/ps_3/New_folder/data/data.csv")  # Replace with your data file

# # Upload data to the dataset
# kaggle.api.dataset_upload_file("data.csv", "D:/ps_3/New_folder/data/data.csv")  # Replace with your local data path

# subprocess.run(["kaggle datasets init -p 'D:/ps_3/New_folder/data/data.csv'"])
#** subprocess.run(["kaggle", "datasets", "init", "-p", "D:/ps_3/New_folder/data"])
# subprocess.run(["kaggle", "datasets", "create", "-p", "D:/ps_3/New_folder/data"])
# **subprocess.run(["kaggle", "datasets", "create", "--dir-mode", "zip", "-p", "D:\\ps_3\\New_folder\\data"])
# Run the notebook
# subprocess.run(["kaggle", "notebook", "run", "-p", "https://www.kaggle.com/code/alapatirohith/kaggleint/"])

#** subprocess.run(["kaggle", "kernels", "init", "-p", "D://ps_3//New_folder//notebook"])
# result=subprocess.run(["kaggle", "kernels", "push", "-p", "D://ps_3//New_folder//notebook"])
# print(result)

subprocess.run(["kaggle", "kernels", "output", "alapatirohith/kaggleint6", "-p", "D:\\ps_3\\New_folder"])
with open('D:\\ps_3\\New_folder\\result.json', 'r') as file:
    data = json.load(file)
    print(data)
# # Download the result file
# kaggle.api.dataset_download_file("dataset", file_name="result.csv", path="D:/ps_3/New_folder")

# # Load the result
# result = pd.read_csv("D:/ps_3/New_folder/result.csv")

# # Display the result
# print(result)
