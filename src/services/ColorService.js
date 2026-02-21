export const ColorService = {

    // d = sqrt((r2-r1)^2 + (g2-g1)^2 + (b2-b1)^2)
    getDistance: (c1, c2) => {
      return Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
      );
    },
  
    findClosestPokemon: (targetColor, pokemonColorPalette) => {
      let closest = null;
      let minDistance = Infinity;
  
      pokemonColorPalette.forEach((pokemon) => {
        const distance = ColorService.getDistance(targetColor, pokemon.rgb);
        if (distance < minDistance) {
          minDistance = distance;
          closest = pokemon;
        }
      });
  
      return closest;
    }
  };