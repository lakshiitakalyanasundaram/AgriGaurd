import torch

# Define paths for saving the model
MODEL_PATH = "plant_disease_model.pth1"
TRACED_MODEL_PATH = "plant_disease_model_traced.pt1"
CLASS_NAMES_PATH = "class_names.txt1"

def save_model(model, class_names):
    """Save the trained model and class names"""
    print("Saving model...")

    # Save the model state dictionary
    torch.save(model.state_dict(), MODEL_PATH)
    
    # Save class names
    with open(CLASS_NAMES_PATH, 'w') as f:
        for class_name in class_names:
            f.write(f"{class_name}\n")

    # Save a traced model for inference
    model.eval()
    example_input = torch.rand(1, 3, 224, 224).to(next(model.parameters()).device)
    traced_script_module = torch.jit.trace(model, example_input)
    traced_script_module.save(TRACED_MODEL_PATH)

    print(f"Model saved successfully at {MODEL_PATH}")
    print(f"Traced model saved successfully at {TRACED_MODEL_PATH}")
    print(f"Class names saved successfully at {CLASS_NAMES_PATH}")

# Example usage (make sure you have your trained model and class names)
# save_model(trained_model, class_names)
