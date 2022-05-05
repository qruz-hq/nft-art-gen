# NFTArt
NFTArt is an app created with the intent of generating art based of different assets the users provides.

**This is still in development, many issues exist, but they'll be fixed soon :)**

## How do we calculate rarity ?
A trait that is present in only *1%* of the generated NFTs doesn't always equals to a rare trait :
Take for example, a collection that contains 3 different types of assets :
 - Hats
 - Glasses
 - Head color

If we create 100 different Hats and all of them have equals chances to be generated, it'll mean each of them will have, on average, a frequency of 1%. This does not depend on the collection size. To solve this problem, we use the frequency over the most frequent asset :
 
| Hat | Frequency |
|--|--|
| 1 | 25% |
| 2 | 20.5% |
| 3 | 20% |
| 4 | 3% |
| 5 | 1% |
| 6 | 0.5% |
| 7 | 30% |



In this example, we can all agree that the rarest feature will be **Hat 6**. But, how rare is it ? To evaluate we use the frequency over the frequency of the most frequent feature :

**HAT 6 Rarity** : `0.5 / 30 = 0,01666666667`

**HAT 7 Rarity** : `30 / 30 = 1`

We can of course later  normalize it by subtracting the result to 1 giving us an higher value meaning an higher rarity trait :

**HAT 6 Normalized Rarity** : `1 - (0.5 / 30) = 0,9833333333`

**HAT 7 Normalized Rarity** : `1 - (30 / 30) = 0`
 
 ## How to apply this to the generation ?
Knowing all this sorcery maths, It'll be easier to make the rarity score. To apply this to the generation we can make sliders that all add up to 100% and make it so the generator randomly but accurately selects a trait for the generation.

We can also add a `rarity` trait representing the sum of the *normalized* trait rarities

## How to launch
1. Install dependencies : `npm install` OR `yarn install`
2. Launch the app : `npm run dev` OR `yarn dev`
3. Open the app in your browser : `http://localhost:3000`

OR
Visit : https://nft-art-gen.vercel.app/
