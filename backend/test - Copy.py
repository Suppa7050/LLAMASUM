import kaggle
import subprocess
import json

# Authenticate with Kaggle API
kaggle.api.authenticate()

# subprocess.run(["kaggle", "datasets", "init", "-p", "D:/ps_3/New_folder/data"])
#** subprocess.run(["kaggle", "datasets", "create", "-p", "D:/ps_3/New_folder/data"])
# subprocess.run(["kaggle", "datasets", "create", "--dir-mode", "zip", "-p", "D:\\ps_3\\New_folder\\data"])

# subprocess.run(["kaggle", "kernels", "init", "-p", "D://ps_3//New_folder//notebook"])
# subprocess.run(["kaggle", "kernels", "push", "-p", "D://ps_3//New_folder//notebook"])

# subprocess.run(["kaggle", "kernels", "output", "alapatirohith/kaggleint5", "-p", "D:\\ps_3\\New_folder"])
with open('D:\\ps_3\\New_folder\\result.json', 'r') as file:
    data = json.load(file)
    print(data)
