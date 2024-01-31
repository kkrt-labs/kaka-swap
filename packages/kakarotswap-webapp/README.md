# Kakarot-swap

The project works with a hacky fork of uniswap sdk that needs to be updated manually after each deployment or when
adding a network. The app was developed to work on several chains with the same front end but this is currently not
supported as two `constants.ts` files define the global

```javascript
const INIT_CODE_HASH = '0xff7d4c259a81d786617e52f1ebf6b453071c53117f51d12bc4a40466eb741d44';
const FACTORY_ADDRESS = '0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8';
const ROUTER_ADDRESS = '0x998abeb3E57409262aE5b751f60747921B33613E';
```

while the current deployment script doesn't set the `Factory` and `Router` at a constant address. Furthermore, the front
end defines enum to store addresses per chain id that needs to be updated as well when redeploying or adding a new
chain.

## Configuration

In order to run the app, you need to:

- deploy the contracts using `kakarotswap-contracts` package
- search for all and update the given `const` above mentioned
- search for all the mention of your target network name (e.g. "anvil") and update the addresses to the latest
  deployment
  - (optional): if you are the first to deploy to a given chain, search for an existing chain (e.g. "anvil") and add
    entries accordingly. Search by both name ("anvil") and chain id ("31337")
- `npm install`

## Run

```bash
npm start
```
