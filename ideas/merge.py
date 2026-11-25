# Merge ideas/batches/*.json into ideas/ideas.json (keeps her status + notes on ideas already there).
import json, glob, os, sys, datetime
root = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(root, 'ideas.json')
db = json.load(open(db_path)) if os.path.exists(db_path) else {'ideas': []}
by_id = {i['id']: i for i in db['ideas']}
added = 0
for f in sorted(glob.glob(os.path.join(root, 'batches', '*.json'))):
    for i in json.load(open(f)):
        old = by_id.get(i['id'])
        if old:
            i['status'], i['note'] = old.get('status', i.get('status')), old.get('note') or i.get('note', '')
            old.update(i)
        else:
            db['ideas'].append(i); by_id[i['id']] = i; added += 1
db['updated'] = datetime.date.today().isoformat()
json.dump(db, open(db_path, 'w'), indent=2, ensure_ascii=False)
print(f'{added} new, {len(db["ideas"])} total')
