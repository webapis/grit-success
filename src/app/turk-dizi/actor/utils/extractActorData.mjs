


import fs from 'fs'
debugger

const data = fs.readFileSync(`${process.cwd()}/turk-dizi-data/yapim-sirketleri.json`)
debugger
const tvSeriesData = JSON.parse(data)
// Create an empty object to store actors and their associated tv series
function regroupByActors(productionCompanies) {
  if (!Array.isArray(productionCompanies)) {
    console.error('Invalid input: expected an array of production companies');
    return null;
  }

  const actorsMap = new Map();

  // Helper function to get or create actor entry
  function getOrCreateActor(actor) {
    if (!actorsMap.has(actor.ACTOR)) {
      actorsMap.set(actor.ACTOR, {
        name: actor.ACTOR,
        image: actor.ACTOR_IMAGE,
        tvSeries: []
      });
    }
    return actorsMap.get(actor.ACTOR);
  }

  // Process each production company
  productionCompanies.forEach(company => {
    if (company && typeof company === 'object' && Array.isArray(company.tvSeries)) {
      // Process each TV series
      company.tvSeries.forEach(series => {
        if (series && typeof series === 'object') {
          const seriesInfo = {
            id: series.id,
            title: series.title,
            year: series.year,
            thumbnail: series.thumbnail,
            productionCompanies: series.productionCompanies,
            channelLogo: series.channelLogo,
            channelName: series.channelName,
            state: series.state,
            genres: series.genres,
            sha: series.sha,
            lastEpisode: series.lastEpisode,
            watchOptions: series.watchOptions,
            productionCompany: {
              id: company.id,
              title: company.title,
              logo: company.logo
            }
          };

          // Check if actors exist and is an array
          if (Array.isArray(series.actors)) {
            // Add this series to each actor's list
            series.actors.forEach(actor => {
              if (actor && typeof actor === 'object' && actor.ACTOR) {
                const actorEntry = getOrCreateActor(actor);
                actorEntry.tvSeries.push(seriesInfo);
              }
            });
          }
        }
      });
    }
  });

  // Convert the map to an array and sort
  const sortedActors = Array.from(actorsMap.values()).sort((a, b) => {
    // Primary sort: Alphabetically by actor name
    const nameComparison = a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' });
    if (nameComparison !== 0) return nameComparison;
    
    // Secondary sort: By number of TV series (descending)
    return b.tvSeries.length - a.tvSeries.length;
  });

  // Construct the final result
  const result = {
    actors: sortedActors,
    actorCount: sortedActors.length,
    tvSeriesCount: sortedActors.reduce((sum, actor) => sum + actor.tvSeries.length, 0),
    productionCompanyCount: productionCompanies.length
  };

  return result;
}


debugger
const result = regroupByActors(tvSeriesData)

debugger
// Usage example:
// const regroupedData = regroupByActors(originalData);
// console.log(JSON.stringify(regroupedData, null, 2));