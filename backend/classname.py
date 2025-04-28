import os

# Path to the dataset (use raw string or forward slashes)
dataset_path = r"C:\Users\harih\Downloads\PlantDiseasesDataset\train"  # Use the train folder
# OR
# dataset_path = "C:/Users/harih/Downloads/PlantDiseasesDataset/train"

# Initialize a list to store class names
class_names = []

# Traverse the dataset directory
for class_name in sorted(os.listdir(dataset_path)):
    class_path = os.path.join(dataset_path, class_name)
    if os.path.isdir(class_path):
        class_names.append(class_name)

# Save the class names to a file
with open("class_names.txt", "w") as f:
    for class_name in class_names:
        f.write(f"{class_name}\n")

print("Class names extracted and saved to class_names.txt")
print("Class names:", class_names)