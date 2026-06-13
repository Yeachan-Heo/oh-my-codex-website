# GEO benchmark for oh-my-codex

This site ships a [`geobench`](https://github.com/NomaDamas/geobench) product spec for measuring how often LLM answers mention and cite oh-my-codex / OmX.

## Spec

- Product spec: [`../geobench/oh-my-codex.yaml`](../geobench/oh-my-codex.yaml)
- Public site: <https://yeachan-heo.github.io/oh-my-codex-website/>
- Repository: <https://github.com/Yeachan-Heo/oh-my-codex>

## Run locally

```bash
# from this repository, with geobench cloned/built elsewhere
/path/to/geobench/dist/geobench estimate --product geobench/oh-my-codex.yaml --providers openai --tier cheap
/path/to/geobench/dist/geobench profile geobench/oh-my-codex.yaml
/path/to/geobench/dist/geobench bench --product geobench/oh-my-codex.yaml --providers openai --tier cheap --mode benchmark
```

## Publishable metrics

Publish aggregate GEO operational metrics only:

- hit rate and confidence interval
- MRR and confidence interval
- share of voice
- citation rate/share
- top public cited domains
- provider-level deltas between comparable runs

Do not publish raw provider answers, private prompts, API keys, or internal run logs.
