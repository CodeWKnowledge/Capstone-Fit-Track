// Using native fetch

const BASE_URL = 'https://wger.de/api/v2';

const testApi = async () => {
    console.log("Testing API...");
    try {
        console.log(`Fetching ${BASE_URL}/exerciseinfo/?language=2&limit=50...`);
        const response = await fetch(`${BASE_URL}/exerciseinfo/?language=2&limit=50`);
        console.log("Status:", response.status);
        if (!response.ok) {
            console.error("Response not ok");
            return;
        }
        const data = await response.json();
        console.log("Results count:", data.results ? data.results.length : "No results field");
        if (data.results && data.results.length > 0) {
            const first = data.results[0];
            console.log("First item translations:", JSON.stringify(first.translations, null, 2));
        }
        
        console.log(`\nFetching ${BASE_URL}/exercise/?language=2&limit=5...`);
        const exResp = await fetch(`${BASE_URL}/exercise/?language=2&limit=5`);
        const exData = await exResp.json();
        if (exData.results && exData.results.length > 0) {
            console.log("Standard Exercise endpoint item keys:", Object.keys(exData.results[0]));
            console.log("Standard Exercise endpoint item name:", exData.results[0].name);
        }

    } catch (e) {
        console.error("Fetch Error:", e);
    }
};

testApi();
