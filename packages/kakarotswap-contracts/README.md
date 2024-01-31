# KakarotSwap

KakarotSwap has been developed during the OnlyDust Tel-Aviv hackathon preceding the Starkware Session.

This is a UniswapV2 fork ready to be deployed to any EVM chain, and especially kakarot.

## Installation

The project uses foundry to compile and a custom python script to deploy.
Note: forge script (`.s.sol`) could not be used due to compiler version mismatch in the old Univ2 libraries.

In order to use the project, you need to install:

- [foundry](https://github.com/foundry-rs/foundry)
- [poetry](https://python-poetry.org/)

And to create a `.env` file at the root:

```bash
cp .env.example .env
```

Just copying this `.env.example` file will be enough to target `anvil` network. Otherwise, make sure to fill out the other variables.

## Deployment

```bash
poetry install
forge build
poetry run python scripts/deploy.py
```

By default, the deployment script will use `anvil` as target network, so you need to start it before

```bash
anvil
```

Otherwise, you can target any network by specifying the `RPC_URL` .env variable:

```bash
RPC_URL=https://... poetry run python scripts/deploy.py
```
