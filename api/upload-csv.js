const csv = require('csv-parser');
const { Readable } = require('stream');
const { plotBarGraph, plotLineGraph, plotScatterPlot } = require('./plotting');

module.exports = async (req, res) => {
  try {
    const { file } = req.body;
    const results = [];

    const stream = Readable.from(file.buffer.toString());
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // Process the CSV data and generate the visualizations
        const barGraph = plotBarGraph(results);
        const lineGraph = plotLineGraph(results);
        const scatterPlot = plotScatterPlot(results);

        // Return the visualizations as a response
        res.json({ barGraph, lineGraph, scatterPlot });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
