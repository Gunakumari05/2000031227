import React, { useState } from 'react';

function NumberManagementService() {
  const [numbers, setNumbers] = useState([]);

  const handleGetNumbers = async (urls) => {
    const promises = urls.map((url) => fetch(url));
    const responses = await Promise.allSettled(promises);

    let result = [];
    responses.forEach((response) => {
      if (response.status === 'fulfilled') {
        const data = response.value.json();
        if (data && data.numbers) {
          result = [...result, ...data.numbers];
        }
      }
    });

    setNumbers(Array.from(new Set(result)).sort((a, b) => a - b));
  };

  const handleUrls = async (urls) => {
    const validUrls = urls.filter((url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    });

    handleGetNumbers(validUrls);
  };

  return (
    <div>
      <button
        onClick={() =>
          handleUrls([
            'http://104.211.219.98/numbers/primes',
            'http://abc.com/fibo',
          ])
        }
      >
        Get Numbers
      </button>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default NumberManagementService;