const BASE_URL = 'https://wger.de/api/v2';

// Cache for API responses
const cache = new Map();

export const fetchExercises = async () => {
  if (cache.has('exercises')) {
    return cache.get('exercises');
  }

  try {
    // 1. Fetch Exercises (limit 50)
    // language=2 is English.
    const exerciseResponse = await fetch(`${BASE_URL}/exerciseinfo/?language=2&limit=50`);
    if (!exerciseResponse.ok) throw new Error('Failed to fetch exercises');
    const exerciseData = await exerciseResponse.json();
    const exercises = exerciseData.results;

    // 2. Fetch Images (limit 100 to cover potential matches)
    // This is an optimization; ideally we'd fetch per exercise ID if the API supported batching better.
    // Or we fetch a list of images and match them locally.
    const imageResponse = await fetch(`${BASE_URL}/exerciseimage/?limit=100`);
    let images = [];
    if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        images = imageData.results;
    }

    // 3. Merge Images into Exercises
    const mergedExercises = exercises.map(ex => {
        // Find an image where exercise base_id matches ex.id or similar.
        // WGER API structure: ExerciseInfo has `id` (which is the info ID). The exercise has a `category`.
        // The Image endpoint usually links to `exercise_base`.
        // Actually, `exerciseinfo` results often don't directly link to the image easily without the base ID.
        // However, `exerciseinfo` has `category` and `muscles`.
        // Let's see if we can just match by exercise ID if possible, roughly. 
        // WGER can be tricky. Let's look for a direct match or just pass empty for now if it's too complex without multiple calls.
        // Wait, `exerciseinfo` returns objects that have an `id`. 
        // `exerciseimage` objects have `exercise_base`. 
        // It turns out `exerciseinfo` doesn't always give `exercise_base`.
        // Let's try a simpler approach: if WGER provides a `uuid` or similar.
        // Better yet, let's just default to a placeholder if no image, but try to find one.
        
        // Simpler strategy for this demo:
        // Filter images that might match by name? No, risky.
        // Let's use the provided `category` to assign a generic icon/image if no specific image found.
        
        // Try to match by exercise_base if present, otherwise assume ID matches base
        const baseId = ex.exercise_base || ex.id;
        const matchedImage = images.find(img => img.exercise_base === baseId);

        // Extract name and description from translations if not at top level
        let name = ex.name;
        let description = ex.description;

        if (!name && ex.translations && ex.translations.length > 0) {
            // We filtered by language=2 in fetch, but double check or take first
            const translation = ex.translations.find(t => t.language === 2) || ex.translations[0];
            name = translation.name;
            description = translation.description;
        }

        return {
            ...ex,
            name: name || "Unnamed Exercise",
            description: description || "No description available.",
            image: matchedImage ? matchedImage.image : null
        };
    });

    cache.set('exercises', mergedExercises);
    return mergedExercises;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchMuscleGroups = async () => {
    if (cache.has('muscles')) {
        return cache.get('muscles');
    }
    try {
        const response = await fetch(`${BASE_URL}/muscle/`);
         if (!response.ok) {
            throw new Error('Failed to fetch muscles');
        }
        const data = await response.json();
        cache.set('muscles', data.results);
        return data.results;
    } catch (error) {
        console.error("API Error", error);
        throw error;
    }
}
