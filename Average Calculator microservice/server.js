const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 9876;

const WINDOW_SIZE = 10;
const TIMEOUT = 500; // Timeout for third-party API in milliseconds
let numberWindow = [];

// Helper function to fetch numbers from the third-party API
const fetchNumbers = async (numberid) => {
  const url = `http://20.244.56.144/test/primes`; // Replace with actual API
  try {
    const response = await axios.get(url, { timeout: TIMEOUT });
    return response.data.numbers;
  } catch (error) {
    console.error("Error fetching numbers:", error.message);
    return [];
  }
};

// Helper function to calculate the average
const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

// API endpoint
app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  if (!["p", "f", "e", "r"].includes(numberid)) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  const prevState = [...numberWindow];

  // Fetch numbers from the third-party API
  const fetchedNumbers = await fetchNumbers(numberid);
  const uniqueNumbers = [...new Set(fetchedNumbers)];

  // Update number window ensuring uniqueness and window size
  uniqueNumbers.forEach((num) => {
    if (!numberWindow.includes(num)) {
      if (numberWindow.length >= WINDOW_SIZE) {
        numberWindow.shift();
      }
      numberWindow.push(num);
    }
  });

  const avg = calculateAverage(numberWindow);

  res.json({
    windowPrevState: prevState,
    windowCurrState: numberWindow,
    numbers: uniqueNumbers,
    avg: avg.toFixed(2),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
