"""Atualiza data/metrics.json com os indicadores bibliométricos do professor.

Executado diariamente pelo GitHub Actions (.github/workflows/metricas.yml).
Cada base é consultada de forma independente: se uma falhar ou não tiver
chave configurada, o valor anterior é mantido.

Chaves opcionais (Settings > Secrets and variables > Actions):
  SCOPUS_API_KEY  - https://dev.elsevier.com
  WOS_API_KEY     - https://developer.clarivate.com (Web of Science Starter API)
  IEEE_API_KEY    - https://developer.ieee.org
"""
import datetime
import json
import os
import re
import sys
import urllib.parse
import urllib.request

SCOPUS_ID = "57189575900"
WOS_ID = "G-5902-2016"
SCHOLAR_ID = "nwmX8RcAAAAJ"
IEEE_AUTHOR = "Rafael M. R. Barros"
IEEE_AUTHOR_ID = "37089947436"
ORCID_ID = "0000-0002-7243-9640"

PATH = os.path.join(os.path.dirname(__file__), "..", "data", "metrics.json")
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"


def get(url, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def h_index(counts):
    counts = sorted(counts, reverse=True)
    return sum(1 for i, c in enumerate(counts, 1) if c >= i)


def scholar():
    html = get(f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en")
    vals = [int(v) for v in re.findall(r'class="gsc_rsb_std">(\d+)<', html)]
    if len(vals) < 3:
        raise ValueError("tabela de indicadores não encontrada (possível bloqueio)")
    return {"citations": vals[0], "h": vals[2]}


def scopus():
    key = os.environ.get("SCOPUS_API_KEY")
    if not key:
        return None
    counts, start = [], 0
    while True:
        q = urllib.parse.urlencode({"query": f"AU-ID({SCOPUS_ID})", "start": start, "count": 25, "field": "citedby-count"})
        d = json.loads(get(f"https://api.elsevier.com/content/search/scopus?{q}",
                           {"X-ELS-APIKey": key, "Accept": "application/json"}))
        res = d["search-results"]
        entries = [e for e in res.get("entry", []) if "citedby-count" in e]
        counts += [int(e["citedby-count"]) for e in entries]
        start += 25
        if start >= int(res["opensearch:totalResults"]) or not entries:
            break
    return {"citations": sum(counts), "h": h_index(counts)}


def wos():
    key = os.environ.get("WOS_API_KEY")
    if not key:
        return None
    counts, page = [], 1
    while True:
        q = urllib.parse.urlencode({"q": f"AI=({WOS_ID})", "db": "WOS", "limit": 50, "page": page})
        d = json.loads(get(f"https://api.clarivate.com/apis/wos-starter/v1/documents?{q}", {"X-ApiKey": key}))
        for hit in d.get("hits", []):
            c = [x["count"] for x in hit.get("citations", []) if x.get("db") == "WOS"]
            counts.append(c[0] if c else 0)
        if page * 50 >= d["metadata"]["total"]:
            break
        page += 1
    return {"citations": sum(counts), "h": h_index(counts)}


def ieee():
    key = os.environ.get("IEEE_API_KEY")
    if not key:
        return None
    total, start = 0, 1
    while True:
        q = urllib.parse.urlencode({"apikey": key, "author": IEEE_AUTHOR, "max_records": 200, "start_record": start, "format": "json"})
        d = json.loads(get(f"https://ieeexploreapi.ieee.org/api/v1/search/articles?{q}"))
        arts = d.get("articles", [])
        for a in arts:
            ids = [str(x.get("id")) for x in a.get("authors", {}).get("authors", [])]
            if IEEE_AUTHOR_ID in ids:
                total += int(a.get("citing_paper_count", 0))
        start += 200
        if start > int(d.get("total_records", 0)) or not arts:
            break
    return {"citations": total}


def orcid():
    d = json.loads(get(f"https://pub.orcid.org/v3.0/{ORCID_ID}/works", {"Accept": "application/json"}))
    return {"works": len(d.get("group", []))}


def main():
    with open(PATH, encoding="utf-8") as f:
        data = json.load(f)
    changed = False
    for name, fn in [("scholar", scholar), ("scopus", scopus), ("wos", wos), ("ieee", ieee), ("orcid", orcid)]:
        try:
            val = fn()
            if val is None:
                print(f"{name}: sem chave configurada, mantido")
                continue
            print(f"{name}: {val}")
            data[name] = val
            changed = True
        except Exception as e:  # mantém o valor anterior
            print(f"{name}: falhou ({e}), mantido", file=sys.stderr)
    if changed:
        data["updated"] = datetime.date.today().isoformat()
    with open(PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


if __name__ == "__main__":
    main()
