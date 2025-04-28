
const API_URL = 'http://localhost:5000';

export interface PredictionResponse {
  prediction: number;
  disease: string;
  top3_predictions: [string, number][];
}

export async function predictDisease(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to predict disease');
  }

  return response.json();
}
