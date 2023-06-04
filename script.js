const handleSubmit = async (event) => {
  event.preventDefault();
  
  const fileInput = document.querySelector('#csvFile');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a CSV file.');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('/api/upload-csv', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('An error occurred while uploading the CSV file.');
    }
    
    const { barGraph, lineGraph, scatterPlot } = await response.json();
    
    // Display the visualizations in the web page as desired
    console.log(barGraph, lineGraph, scatterPlot);
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
};

document.querySelector('#csvForm').addEventListener('submit', handleSubmit);
